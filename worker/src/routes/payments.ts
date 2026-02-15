import { Hono } from 'hono'

type Bindings = {
    DB: D1Database
    RAZORPAY_KEY_ID: string
    RAZORPAY_KEY_SECRET: string
    RAZORPAY_WEBHOOK_SECRET: string
    SANITY_PROJECT_ID: string
    SANITY_DATASET: string
}

export const payments = new Hono<{ Bindings: Bindings }>()

// Helper: create Razorpay auth header
function razorpayAuth(keyId: string, keySecret: string): string {
    return 'Basic ' + btoa(`${keyId}:${keySecret}`)
}

// POST /api/payments/create-order
// Creates a Razorpay order and saves booking to D1
payments.post('/create-order', async (c) => {
    try {
        const body = await c.req.json()
        const { amount, currency = 'INR', fullName, email, phone, serviceType, sessionType, preferredDate, preferredTime, description } = body

        if (!amount || !fullName || !email || !phone || !serviceType) {
            return c.json({ error: 'Missing required fields' }, 400)
        }

        // Create Razorpay order via REST API
        const orderRes = await fetch('https://api.razorpay.com/v1/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': razorpayAuth(c.env.RAZORPAY_KEY_ID, c.env.RAZORPAY_KEY_SECRET),
            },
            body: JSON.stringify({
                amount: amount * 100, // Razorpay expects paise
                currency,
                receipt: `booking_${Date.now()}`,
                notes: {
                    name: fullName,
                    email,
                    phone,
                    service: serviceType,
                },
            }),
        })

        if (!orderRes.ok) {
            const errText = await orderRes.text()
            console.error('Razorpay order error:', errText)
            return c.json({ error: 'Failed to create payment order' }, 500)
        }

        const order = await orderRes.json() as any

        // Save booking to D1 with pending status
        await c.env.DB.prepare(
            `INSERT INTO bookings (full_name, email, phone, service_type, session_type, preferred_date, preferred_time, description, amount, razorpay_order_id, status, payment_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'created')`
        ).bind(
            fullName, email, phone, serviceType,
            sessionType || 'online',
            preferredDate || null,
            preferredTime || null,
            description || null,
            amount,
            order.id
        ).run()

        return c.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: c.env.RAZORPAY_KEY_ID,
        })
    } catch (err: any) {
        console.error('Create order error:', err)
        return c.json({ error: 'Internal server error', details: err.message }, 500)
    }
})

// POST /api/payments/verify
// Verifies Razorpay payment signature and updates booking
payments.post('/verify', async (c) => {
    try {
        const body = await c.req.json()
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return c.json({ error: 'Missing payment verification fields' }, 400)
        }

        // Verify signature using Web Crypto API (no Node.js crypto needed)
        const message = `${razorpay_order_id}|${razorpay_payment_id}`
        const encoder = new TextEncoder()
        const keyData = encoder.encode(c.env.RAZORPAY_KEY_SECRET)
        const msgData = encoder.encode(message)

        const cryptoKey = await crypto.subtle.importKey(
            'raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
        )
        const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, msgData)
        const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('')

        if (expectedSignature !== razorpay_signature) {
            // Update booking as failed
            await c.env.DB.prepare(
                `UPDATE bookings SET payment_status = 'failed', updated_at = datetime('now') WHERE razorpay_order_id = ?`
            ).bind(razorpay_order_id).run()

            return c.json({ error: 'Invalid payment signature', verified: false }, 400)
        }

        // Update booking as paid
        await c.env.DB.prepare(
            `UPDATE bookings SET 
        razorpay_payment_id = ?, 
        razorpay_signature = ?, 
        payment_status = 'paid', 
        status = 'confirmed',
        updated_at = datetime('now')
       WHERE razorpay_order_id = ?`
        ).bind(razorpay_payment_id, razorpay_signature, razorpay_order_id).run()

        return c.json({ verified: true, message: 'Payment verified successfully' })
    } catch (err: any) {
        console.error('Verify payment error:', err)
        return c.json({ error: 'Internal server error', details: err.message }, 500)
    }
})

// GET /api/payments/status/:orderId
// Check payment status for a given order
payments.get('/status/:orderId', async (c) => {
    try {
        const orderId = c.req.param('orderId')
        const result = await c.env.DB.prepare(
            `SELECT id, full_name, email, service_type, amount, payment_status, status, created_at 
       FROM bookings WHERE razorpay_order_id = ?`
        ).bind(orderId).first()

        if (!result) {
            return c.json({ error: 'Order not found' }, 404)
        }

        return c.json(result)
    } catch (err: any) {
        return c.json({ error: 'Internal server error' }, 500)
    }
})

// POST /api/payments/webhook
// Razorpay webhook handler — verifies signature using RAZORPAY_WEBHOOK_SECRET
payments.post('/webhook', async (c) => {
    try {
        const rawBody = await c.req.text()
        const signature = c.req.header('x-razorpay-signature')

        if (!signature) {
            return c.json({ error: 'Missing signature header' }, 400)
        }

        // Verify webhook signature using Web Crypto HMAC
        const encoder = new TextEncoder()
        const keyData = encoder.encode(c.env.RAZORPAY_WEBHOOK_SECRET)
        const msgData = encoder.encode(rawBody)

        const cryptoKey = await crypto.subtle.importKey(
            'raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
        )
        const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, msgData)
        const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('')

        if (expectedSignature !== signature) {
            console.error('Webhook signature mismatch')
            return c.json({ error: 'Invalid webhook signature' }, 400)
        }

        // Parse the webhook event
        const event = JSON.parse(rawBody)
        const eventType = event.event

        if (eventType === 'payment.captured') {
            const payment = event.payload?.payment?.entity
            if (payment?.order_id) {
                await c.env.DB.prepare(
                    `UPDATE bookings SET 
                        razorpay_payment_id = ?,
                        payment_status = 'paid',
                        status = 'confirmed',
                        updated_at = datetime('now')
                     WHERE razorpay_order_id = ?`
                ).bind(payment.id, payment.order_id).run()
                console.log(`Webhook: payment.captured for order ${payment.order_id}`)
            }
        } else if (eventType === 'payment.failed') {
            const payment = event.payload?.payment?.entity
            if (payment?.order_id) {
                await c.env.DB.prepare(
                    `UPDATE bookings SET 
                        payment_status = 'failed',
                        updated_at = datetime('now')
                     WHERE razorpay_order_id = ?`
                ).bind(payment.order_id).run()
                console.log(`Webhook: payment.failed for order ${payment.order_id}`)
            }
        }

        return c.json({ status: 'ok' })
    } catch (err: any) {
        console.error('Webhook error:', err)
        return c.json({ error: 'Webhook processing failed' }, 500)
    }
})
