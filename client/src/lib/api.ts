// Innervea Worker API Client
// All form submissions use mailto: as primary action.
// This client persists data to D1 in the background (fire-and-forget).

const API_BASE = 'https://innervea-worker.garyphadale.workers.dev';

async function postToWorker(endpoint: string, data: Record<string, unknown>): Promise<void> {
    try {
        await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    } catch (err) {
        // Fire-and-forget: silently ignore errors
        console.warn('[API] Background save failed:', err);
    }
}

/** Save a booking to D1 (background, non-blocking) */
export function saveBooking(data: {
    fullName: string;
    email: string;
    phone: string;
    serviceType: string;
    sessionType?: string;
    preferredDate?: string;
    preferredTime?: string;
    description?: string;
    amount?: number;
}): void {
    postToWorker('/api/bookings', data);
}

/** Save a free-call request to D1 (background, non-blocking) */
export function saveFreeCall(data: {
    fullName: string;
    email: string;
    phone: string;
    preferredDate?: string;
    preferredTime?: string;
    message?: string;
}): void {
    postToWorker('/api/bookings/free-call', data);
}

/** Save a contact form submission to D1 (background, non-blocking) */
export function saveContact(data: {
    fullName: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
}): void {
    postToWorker('/api/contacts', data);
}

/** Save a service query to D1 (background, non-blocking) */
export function saveServiceQuery(data: {
    fullName: string;
    email: string;
    phone: string;
    serviceType: string;
    query: string;
}): void {
    postToWorker('/api/bookings/service-query', data);
}

/** Create a Razorpay order via the Worker */
export async function createPaymentOrder(data: {
    amount: number;
    fullName: string;
    email: string;
    phone: string;
    serviceType: string;
    sessionType?: string;
    preferredDate?: string;
    preferredTime?: string;
    description?: string;
}): Promise<{
    orderId: string;
    amount: number;
    currency: string;
    keyId: string;
} | null> {
    try {
        const res = await fetch(`${API_BASE}/api/payments/create-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) return null;
        return res.json();
    } catch (err) {
        console.error('[API] Create order failed:', err);
        return null;
    }
}

/** Verify a Razorpay payment via the Worker */
export async function verifyPayment(data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}): Promise<{ verified: boolean } | null> {
    try {
        const res = await fetch(`${API_BASE}/api/payments/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) return null;
        return res.json();
    } catch (err) {
        console.error('[API] Verify payment failed:', err);
        return null;
    }
}
