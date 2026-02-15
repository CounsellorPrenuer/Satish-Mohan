import { Hono } from 'hono'

type Bindings = {
    DB: D1Database
}

export const contacts = new Hono<{ Bindings: Bindings }>()

// POST /api/contacts - Save a contact form submission
contacts.post('/', async (c) => {
    try {
        const body = await c.req.json()
        const { fullName, email, phone, subject, message } = body

        if (!fullName || !email || !message) {
            return c.json({ error: 'Missing required fields (fullName, email, message)' }, 400)
        }

        const result = await c.env.DB.prepare(
            `INSERT INTO contacts (full_name, email, phone, subject, message)
       VALUES (?, ?, ?, ?, ?)`
        ).bind(fullName, email, phone || null, subject || null, message).run()

        return c.json({ success: true, id: result.meta.last_row_id })
    } catch (err: any) {
        console.error('Save contact error:', err)
        return c.json({ error: 'Internal server error' }, 500)
    }
})

// GET /api/contacts - List contacts (admin)
contacts.get('/', async (c) => {
    try {
        const { results } = await c.env.DB.prepare(
            `SELECT * FROM contacts ORDER BY created_at DESC LIMIT 100`
        ).all()
        return c.json(results)
    } catch (err: any) {
        return c.json({ error: 'Internal server error' }, 500)
    }
})
