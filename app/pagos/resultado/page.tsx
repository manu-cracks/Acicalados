'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Icon } from '@/components/icons'

type PaymentResult = {
  status: number
  commerceOrder: string
  amount: number
  currency: string
  subject: string
} | null

const statusConfig: Record<number, { icon: 'check' | 'clock' | 'x'; color: string; title: string; message: string }> = {
  1: {
    icon: 'clock',
    color: 'var(--gold)',
    title: 'Pago pendiente',
    message: 'Tu pago está siendo procesado. Recibirás una confirmación en tu correo cuando se complete.',
  },
  2: {
    icon: 'check',
    color: 'var(--ok, #4ade80)',
    title: '¡Pago exitoso!',
    message: 'Tu pago ha sido confirmado. Recibirás un correo de confirmación con los detalles de tu pedido.',
  },
  3: {
    icon: 'x',
    color: 'var(--copper)',
    title: 'Pago rechazado',
    message: 'El pago no pudo completarse. Puedes intentar nuevamente o contactarnos por WhatsApp.',
  },
  4: {
    icon: 'x',
    color: 'var(--mute)',
    title: 'Pago anulado',
    message: 'El pago fue anulado. Si esto fue un error, puedes reintentar la compra.',
  },
}

function PaymentResultContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [result, setResult] = useState<PaymentResult>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!token) {
      setLoading(false)
      setError(true)
      return
    }

    fetch(`/api/payments/status?token=${encodeURIComponent(token)}`)
      .then((r) => {
        if (!r.ok) throw new Error('Failed')
        return r.json()
      })
      .then((data) => {
        setResult(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [token])

  const config = result ? statusConfig[result.status] || statusConfig[1] : null

  return (
    <div>
      <section style={{ paddingTop: 100, paddingBottom: 120, minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          {loading ? (
            <div className="fade-up">
              <div style={{
                width: 80, height: 80, borderRadius: '50%', border: '2px solid var(--line)',
                borderTopColor: 'var(--gold)', margin: '0 auto',
                animation: 'spin 1s linear infinite',
              }} />
              <p className="serif" style={{ fontSize: 24, marginTop: 30 }}>Consultando estado del pago...</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : error || !result ? (
            <div className="fade-up">
              <div style={{
                width: 80, height: 80, borderRadius: '50%', border: '2px solid var(--copper)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto',
              }}>
                <Icon.Close size={32} />
              </div>
              <h1 className="serif" style={{ fontSize: 36, marginTop: 24 }}>Error al consultar el pago</h1>
              <p style={{ color: 'var(--cream-3)', marginTop: 16, lineHeight: 1.65 }}>
                No pudimos obtener el estado de tu pago. Si ya realizaste el pago, recibirás la confirmación por correo.
              </p>
              <div style={{ marginTop: 32, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/" className="btn btn-gold">Volver al inicio</Link>
                <a href="https://wa.me/51987654321" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <Icon.Whatsapp size={16} /> Contactar soporte
                </a>
              </div>
            </div>
          ) : (
            <div className="fade-up">
              <div style={{
                width: 80, height: 80, borderRadius: '50%', border: `2px solid ${config!.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto',
                color: config!.color,
              }}>
                {config!.icon === 'check' && <Icon.Check size={36} />}
                {config!.icon === 'clock' && <Icon.Clock size={36} />}
                {config!.icon === 'x' && <Icon.Close size={36} />}
              </div>

              <h1 className="serif" style={{ fontSize: 36, marginTop: 24, color: config!.color }}>
                {config!.title}
              </h1>

              <p style={{ color: 'var(--cream-3)', marginTop: 16, lineHeight: 1.65, fontSize: 17 }}>
                {config!.message}
              </p>

              <div style={{
                marginTop: 32, padding: 24, border: '1px solid var(--line)', background: 'var(--ink-2)',
                textAlign: 'left', display: 'grid', gap: 12,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="mono" style={{ color: 'var(--mute)' }}>Orden</span>
                  <span className="mono">{result.commerceOrder}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="mono" style={{ color: 'var(--mute)' }}>Concepto</span>
                  <span style={{ textAlign: 'right', fontSize: 14 }}>{result.subject}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--line)' }}>
                  <span className="serif" style={{ fontSize: 18 }}>Total</span>
                  <span className="serif" style={{ fontSize: 22, color: 'var(--gold)' }}>S/ {result.amount}</span>
                </div>
              </div>

              <div style={{ marginTop: 32, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                {result.status === 2 ? (
                  <>
                    <Link href="/" className="btn btn-gold">Volver al inicio</Link>
                    <a href="https://wa.me/51987654321" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                      <Icon.Whatsapp size={16} /> Coordinar por WhatsApp
                    </a>
                  </>
                ) : result.status === 3 || result.status === 4 ? (
                  <>
                    <Link href="/productos" className="btn btn-gold">Reintentar compra</Link>
                    <a href="https://wa.me/51987654321" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                      <Icon.Whatsapp size={16} /> Contactar soporte
                    </a>
                  </>
                ) : (
                  <Link href="/" className="btn btn-gold">Volver al inicio</Link>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default function PaymentResultPage() {
  return (
    <Suspense fallback={
      <div style={{ paddingTop: 100, paddingBottom: 120, minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', border: '2px solid var(--line)',
            borderTopColor: 'var(--gold)', margin: '0 auto',
            animation: 'spin 1s linear infinite',
          }} />
          <p className="serif" style={{ fontSize: 24, marginTop: 30 }}>Cargando...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    }>
      <PaymentResultContent />
    </Suspense>
  )
}
