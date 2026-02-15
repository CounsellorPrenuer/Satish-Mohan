import { Hono } from 'hono'

type Bindings = {
    DB: D1Database
}

export const bookings = new Hono<{ Bindings: Bindings }>()

// POST /api/bookings - Save a booking (for mailto-based submissions that also want DB persistence)
bookings.post('/', async (c) => {
    try {
        const body = await c.req.json()
        const { fullName, email, phone, serviceType, sessionType, preferredDate, preferredTime, description, amount } = body

        if (!fullName || !email || !phone || !serviceType) {
            return c.json({ error: 'Missing required fields' }, 400)
        }

        const result = await c.env.DB.prepare(
            `INSERT INTO bookings (full_name, email, phone, service_type, session_type, preferred_date, preferred_time, description, amount, status, payment_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'unpaid')`
        ).bind(
            fullName, email, phone, serviceType,
            sessionType || 'online',
            preferredDate || null,
            preferredTime || null,
            description || null,
            amount || 0
        ).run()

        return c.json({ success: true, id: result.meta.last_row_id })
    } catch (err: any) {
        console.error('Save booking error:', err)
        return c.json({ error: 'Internal server error' }, 500)
    }
})

// GET /api/bookings - List all bookings (admin)
bookings.get('/', async (c) => {
    try {
        const { results } = await c.env.DB.prepare(
            `SELECT * FROM bookings ORDER BY created_at DESC LIMIT 100`
        ).all()
        return c.json(results)
    } catch (err: any) {
        return c.json({ error: 'Internal server error' }, 500)
    }
})

// POST /api/bookings/free-call - Save free call request
bookings.post('/free-call', async (c) => {
    try {
        const body = await c.req.json()
        const { fullName, email, phone, preferredDate, preferredTime, message } = body

        if (!fullName || !email || !phone) {
            return c.json({ error: 'Missing required fields' }, 400)
        }

        const result = await c.env.DB.prepare(
            `INSERT INTO free_calls (full_name, email, phone, preferred_date, preferred_time, message)
       VALUES (?, ?, ?, ?, ?, ?)`
        ).bind(fullName, email, phone, preferredDate || null, preferredTime || null, message || null).run()

        return c.json({ success: true, id: result.meta.last_row_id })
    } catch (err: any) {
        console.error('Save free call error:', err)
        return c.json({ error: 'Internal server error' }, 500)
    }
})

// GET /api/bookings/free-calls - List free call requests (admin)
bookings.get('/free-calls', async (c) => {
    try {
        const { results } = await c.env.DB.prepare(
            `SELECT * FROM free_calls ORDER BY created_at DESC LIMIT 100`
        ).all()
        return c.json(results)
    } catch (err: any) {
        return c.json({ error: 'Internal server error' }, 500)
    }
})

// POST /api/bookings/service-query - Save service query
bookings.post('/service-query', async (c) => {
    try {
        const body = await c.req.json()
        const { fullName, email, phone, serviceType, query } = body

        if (!fullName || !email || !phone || !serviceType || !query) {
            return c.json({ error: 'Missing required fields' }, 400)
        }

        const result = await c.env.DB.prepare(
            `INSERT INTO service_queries (full_name, email, phone, service_type, query)
       VALUES (?, ?, ?, ?, ?)`
        ).bind(fullName, email, phone, serviceType, query).run()

        return c.json({ success: true, id: result.meta.last_row_id })
    } catch (err: any) {
        console.error('Save service query error:', err)
        return c.json({ error: 'Internal server error' }, 500)
    }
})
