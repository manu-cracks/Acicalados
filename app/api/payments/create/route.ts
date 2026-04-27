// POST /api/payments/create — creates a Flow payment and returns { url, token }
import { NextRequest, NextResponse } from 'next/server'
import { createFlowPayment, generateOrderId } from '@/lib/flow'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, items, email, name, phone, notes } = body

    if (!email || !type || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Datos de pago incompletos' },
        { status: 400 }
      )
    }

    // Calculate amount and generate order based on type
    let amount: number
    let subject: string
    let orderPrefix: string
    let paymentType: 'full' | 'advance'

    switch (type) {
      case 'products': {
        // Full payment for products
        amount = items.reduce(
          (sum: number, item: { price: number; qty: number }) =>
            sum + item.price * item.qty,
          0
        )
        subject = `ACICALADOS — Compra de productos (${items.length} items)`
        orderPrefix = 'PROD'
        paymentType = 'full'
        break
      }
      case 'booking': {
        // 30% advance for service booking
        const totalService = items.reduce(
          (sum: number, item: { price: number }) => sum + (item.price || 0),
          0
        )
        amount = Math.ceil(totalService * 0.3) // 30% advance
        subject = `ACICALADOS — Adelanto de reserva (${items.map((i: { name: string }) => i.name).join(', ')})`
        orderPrefix = 'RES'
        paymentType = 'advance'
        break
      }
      case 'vestuario': {
        // Deposit payment for vestuario
        amount = items.reduce(
          (sum: number, item: { deposit: number }) => sum + (item.deposit || 300),
          0
        )
        subject = `ACICALADOS — Depósito de vestuario (${items.map((i: { name: string }) => i.name).join(', ')})`
        orderPrefix = 'VEST'
        paymentType = 'advance'
        break
      }
      default:
        return NextResponse.json(
          { error: 'Tipo de pago no válido' },
          { status: 400 }
        )
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: 'El monto debe ser mayor a 0' },
        { status: 400 }
      )
    }

    const commerceOrder = generateOrderId(orderPrefix)

    // Save order to Supabase before sending to Flow
    try {
      const supabase = await createClient()
      await supabase.from('orders').insert({
        commerce_order: commerceOrder,
        type,
        payment_type: paymentType,
        status: 'pending',
        amount,
        email,
        customer_name: name || null,
        customer_phone: phone || null,
        notes: notes || null,
        items: JSON.stringify(items),
      })
    } catch (dbError) {
      // Log but don't block — order can be reconciled later from Flow webhook
      console.warn('Could not save order to DB before payment:', dbError)
    }

    // Create Flow payment
    const result = await createFlowPayment({
      commerceOrder,
      subject,
      amount,
      email,
      optional: { type, paymentType, customerName: name || '' },
    })

    return NextResponse.json({
      url: result.url,
      token: result.token,
      commerceOrder,
      amount,
    })
  } catch (error) {
    console.error('Error creating Flow payment:', error)
    return NextResponse.json(
      { error: 'Error al crear el pago. Inténtalo de nuevo.' },
      { status: 500 }
    )
  }
}
