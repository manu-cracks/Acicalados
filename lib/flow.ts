// Flow Payment Gateway — Server-only utilities
// FlowPagos Perú: https://flowpagos.com/peru
// API Docs: https://developers.flow.cl/api

import crypto from 'crypto'

// ─── Config ─────────────────────────────────────────────────────────
const FLOW_BASE_URL =
  process.env.FLOW_ENV === 'production'
    ? 'https://www.flow.cl/api'
    : 'https://sandbox.flow.cl/api'

// ─── HMAC-SHA256 Signing (CRITICAL — see SKILL.md) ─────────────────
// 1. Exclude 's' param
// 2. Sort keys alphabetically
// 3. Concatenate key+value pairs (no separator)
// 4. HMAC-SHA256 with secretKey
export function signParams(
  params: Record<string, string | number>,
  secretKey: string
): string {
  const keys = Object.keys(params)
    .filter((k) => k !== 's')
    .sort()

  const toSign = keys.map((k) => `${k}${params[k]}`).join('')
  return crypto.createHmac('sha256', secretKey).update(toSign).digest('hex')
}

// ─── Payment types ──────────────────────────────────────────────────
export interface FlowPaymentParams {
  commerceOrder: string
  subject: string
  amount: number
  email: string
  optional?: Record<string, string>
}

export interface FlowPaymentResult {
  url: string
  token: string
}

export interface FlowPaymentStatus {
  flowOrder: number
  commerceOrder: string
  requestDate: string
  status: number // 1=Pendiente, 2=Pagado, 3=Rechazado, 4=Anulado
  subject: string
  currency: string
  amount: number
  payer: string
  paymentData?: {
    date: string
    media: string
    conversionDate?: string
    conversionRate?: number
    amount: number
    currency: string
    balance?: number
  }
}

// ─── Create payment ─────────────────────────────────────────────────
export async function createFlowPayment(
  params: FlowPaymentParams
): Promise<FlowPaymentResult> {
  const apiKey = process.env.FLOW_API_KEY
  const secretKey = process.env.FLOW_SECRET_KEY
  const urlConfirmation = process.env.FLOW_URL_CONFIRMATION
  const urlReturn = process.env.FLOW_URL_RETURN

  if (!apiKey || !secretKey || !urlConfirmation || !urlReturn) {
    throw new Error('Flow payment environment variables not configured')
  }

  const flowParams: Record<string, string | number> = {
    apiKey,
    commerceOrder: params.commerceOrder,
    subject: params.subject,
    amount: params.amount,
    email: params.email,
    urlConfirmation,
    urlReturn,
    currency: 'PEN', // ⚠️ Soles peruanos para Perú
    paymentMethod: 9, // 9 = Todos los medios (Yape, PagoEfectivo, tarjetas, etc.)
  }

  // Add optional params if present
  if (params.optional) {
    flowParams.optional = JSON.stringify(params.optional)
  }

  flowParams.s = signParams(flowParams, secretKey)

  const body = new URLSearchParams(
    Object.fromEntries(
      Object.entries(flowParams).map(([k, v]) => [k, String(v)])
    )
  )

  const response = await fetch(`${FLOW_BASE_URL}/payment/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  if (!response.ok) {
    const errorData = await response.text()
    console.error('Flow create payment error:', errorData)
    throw new Error(`Flow API error: ${response.status}`)
  }

  const data = await response.json()
  return { url: data.url, token: data.token }
}

// ─── Get payment status ─────────────────────────────────────────────
export async function getFlowPaymentStatus(
  token: string
): Promise<FlowPaymentStatus> {
  const apiKey = process.env.FLOW_API_KEY
  const secretKey = process.env.FLOW_SECRET_KEY

  if (!apiKey || !secretKey) {
    throw new Error('Flow payment environment variables not configured')
  }

  const params: Record<string, string> = { apiKey, token }
  params.s = signParams(params, secretKey)

  const query = new URLSearchParams(params).toString()
  const response = await fetch(
    `${FLOW_BASE_URL}/payment/getStatus?${query}`,
    { method: 'GET' }
  )

  if (!response.ok) {
    const errorData = await response.text()
    console.error('Flow getStatus error:', errorData)
    throw new Error(`Flow API error: ${response.status}`)
  }

  return response.json()
}

// ─── Helpers ────────────────────────────────────────────────────────
export function generateOrderId(prefix: string = 'ORD'): string {
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${ts}-${rand}`
}

export const FLOW_STATUS = {
  PENDING: 1,
  PAID: 2,
  REJECTED: 3,
  CANCELLED: 4,
} as const

export function getStatusLabel(status: number): string {
  switch (status) {
    case FLOW_STATUS.PENDING:
      return 'Pendiente'
    case FLOW_STATUS.PAID:
      return 'Pagado'
    case FLOW_STATUS.REJECTED:
      return 'Rechazado'
    case FLOW_STATUS.CANCELLED:
      return 'Anulado'
    default:
      return 'Desconocido'
  }
}
