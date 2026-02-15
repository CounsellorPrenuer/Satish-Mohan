import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { payments } from './routes/payments'
import { bookings } from './routes/bookings'
import { contacts } from './routes/contacts'

type Bindings = {
    DB: D1Database
    RAZORPAY_KEY_ID: string
    RAZORPAY_KEY_SECRET: string
    RAZORPAY_WEBHOOK_SECRET: string
    SANITY_PROJECT_ID: string
    SANITY_DATASET: string
    ALLOWED_ORIGIN: string
}

const app = new Hono<{ Bindings: Bindings }>()

// CORS middleware
app.use('/*', cors({
    origin: '*',
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
    maxAge: 86400,
}))

// Health check
app.get('/', (c) => c.json({ status: 'ok', service: 'Innervea API' }))
app.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }))

// Mount routes
app.route('/api/payments', payments)
app.route('/api/bookings', bookings)
app.route('/api/contacts', contacts)

export default app
