// POST /api/payments/confirm — Flow webhook callback
// Flow sends a POST with { token } when payment status changes.
// We verify the payment status and update the order in Supabase.
import { NextRequest, NextResponse } from 'next/server'
import { getFlowPaymentStatus, FLOW_STATUS } from '@/lib/flow'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: NextRequest) {
  try {
    // Flow sends token as form-urlencoded
    const formData = await request.formData()
    const token = formData.get('token') as string

    if (!token) {
      return new NextResponse('Missing token', { status: 400 })
    }

    // Query Flow for the actual payment status
    const payment = await getFlowPaymentStatus(token)

    console.log(
      `[Flow Webhook] Order: ${payment.commerceOrder}, Status: ${payment.status}, Amount: ${payment.amount}`
    )

    // Update order in Supabase
    try {
      const supabase = await createClient()

      const updateData: Record<string, unknown> = {
        flow_status: payment.status,
        flow_order: payment.flowOrder,
        flow_token: token,
        updated_at: new Date().toISOString(),
      }

      if (payment.status === FLOW_STATUS.PAID) {
        updateData.status = 'paid'
        updateData.paid_at = payment.paymentData?.date || new Date().toISOString()
        updateData.payment_media = payment.paymentData?.media || null
      } else if (payment.status === FLOW_STATUS.REJECTED) {
        updateData.status = 'rejected'
      } else if (payment.status === FLOW_STATUS.CANCELLED) {
        updateData.status = 'cancelled'
      }

      await supabase
        .from('orders')
        .update(updateData)
        .eq('commerce_order', payment.commerceOrder)
    } catch (dbError) {
      console.error('Error updating order in DB:', dbError)
    }

    // Flow expects a 200 response
    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.error('Error in Flow webhook:', error)
    return new NextResponse('Error', { status: 500 })
  }
}
