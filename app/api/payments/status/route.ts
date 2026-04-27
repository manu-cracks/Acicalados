// GET /api/payments/status?token=xxx — Check payment status from frontend
import { NextRequest, NextResponse } from 'next/server'
import { getFlowPaymentStatus } from '@/lib/flow'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Token no proporcionado' },
        { status: 400 }
      )
    }

    const payment = await getFlowPaymentStatus(token)

    return NextResponse.json({
      status: payment.status,
      commerceOrder: payment.commerceOrder,
      amount: payment.amount,
      currency: payment.currency,
      subject: payment.subject,
    })
  } catch (error) {
    console.error('Error checking payment status:', error)
    return NextResponse.json(
      { error: 'Error al consultar estado del pago' },
      { status: 500 }
    )
  }
}
