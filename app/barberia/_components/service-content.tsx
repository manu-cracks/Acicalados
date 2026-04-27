'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Service, ServiceItem, BookingCartItem } from '@/types'
import { Icon } from '@/components/icons'
import { CheckoutModal } from '@/components/checkout-modal'

export function ServicePageContent({ service: svc }: { service: Service }) {
  const [bookingCart, setBookingCart] = useState<BookingCartItem[]>([])
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const addToBooking = (item: ServiceItem) => {
    if (bookingCart.find(b => b.id === item.id)) return // already added
    setBookingCart(prev => [...prev, { ...item, rubro: svc.rubro }])
  }

  const removeFromBooking = (id: string) => {
    setBookingCart(prev => prev.filter(b => b.id !== id))
  }

  const bookingTotal = bookingCart.reduce((sum, item) => sum + (item.price || 0), 0)
  const advanceAmount = Math.ceil(bookingTotal * 0.3)

  return (
    <div>
      {/* Hero */}
      <section style={{ paddingTop: 80, paddingBottom: 40 }}>
        <div className="container">
          <div className="fade-up">
            <div className="eyebrow" style={{ marginBottom: 20 }}>— {svc.name}</div>
            <h1 className="serif" style={{ fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 1, fontWeight: 500 }}>
              {svc.id === 'barberia' && <>El oficio de la <em style={{ color: 'var(--gold)' }}>navaja y la tijera.</em></>}
              {svc.id === 'spa' && <>Rituales de <em style={{ color: 'var(--gold)' }}>relajación y cuidado.</em></>}
            </h1>
            <p style={{ marginTop: 20, fontSize: 17, color: 'var(--cream-3)', maxWidth: 620 }}>
              {svc.description}
            </p>
          </div>
        </div>
      </section>

      {/* Service items */}
      <section style={{ paddingTop: 60, paddingBottom: 100, borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.2fr', gap: 80 }} className="svc-grid">
            <div style={{ position: 'sticky', top: 170, alignSelf: 'start' }}>
              <div className="reveal-left">
                <div className="eyebrow" style={{ color: svc.accent }}>— {svc.rubro}</div>
                <h2 className="serif" style={{ fontSize: 44, marginTop: 16, lineHeight: 1 }}>{svc.name}</h2>
                <p style={{ marginTop: 20, color: 'var(--cream-3)', lineHeight: 1.65 }}>{svc.description}</p>
                <div className="ph" data-label={`${svc.rubro} · Ambiente`} style={{ aspectRatio: '4/5', marginTop: 30, border: '1px solid var(--line)' }} />
              </div>

              {/* Booking summary (sticky sidebar) */}
              {bookingCart.length > 0 && (
                <div style={{
                  marginTop: 24, padding: 20,
                  border: '1px solid var(--line-2)', background: 'var(--ink-2)',
                }}>
                  <div className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 12 }}>— Tu reserva</div>
                  {bookingCart.map(item => (
                    <div key={item.id} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '8px 0', borderBottom: '1px solid var(--line)',
                    }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{item.name}</div>
                        <div className="mono" style={{ color: 'var(--mute)', fontSize: 11 }}>{item.duration}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span className="mono" style={{ color: 'var(--gold)', fontSize: 13 }}>
                          {item.price ? `S/ ${item.price}` : '—'}
                        </span>
                        <button
                          onClick={() => removeFromBooking(item.id)}
                          style={{
                            width: 20, height: 20, display: 'flex', alignItems: 'center',
                            justifyContent: 'center', color: 'var(--mute)',
                            transition: 'color 0.2s',
                          }}
                          aria-label={`Quitar ${item.name}`}
                        >
                          <Icon.Close size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    paddingTop: 12, marginTop: 8,
                  }}>
                    <span className="mono" style={{ color: 'var(--mute)' }}>Adelanto (30%)</span>
                    <span className="serif" style={{ fontSize: 18, color: 'var(--gold)' }}>S/ {advanceAmount}</span>
                  </div>
                  <button
                    className="btn btn-gold"
                    style={{
                      width: '100%', marginTop: 12,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                    onClick={() => setCheckoutOpen(true)}
                  >
                    <Icon.CreditCard size={14} />
                    Reservar y pagar adelanto
                  </button>
                  <div style={{
                    marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 6, color: 'var(--mute)', fontSize: 11,
                  }}>
                    <Icon.Lock size={10} />
                    <span>Pago seguro · Yape · Tarjetas · PagoEfectivo</span>
                  </div>
                </div>
              )}
            </div>
            <div>
              {svc.items.map((item, i) => {
                const isInCart = bookingCart.find(b => b.id === item.id)
                return (
                  <div key={item.id}
                    style={{
                      padding: '28px 0', borderBottom: '1px solid var(--line)',
                      display: 'grid', gridTemplateColumns: '60px 1fr auto auto', gap: 20, alignItems: 'center',
                      opacity: isInCart ? 0.6 : 1, transition: 'opacity 0.2s',
                    }} className="svc-row">
                    <div className="serif" style={{ fontSize: 32, color: 'var(--mute-2)' }}>{String(i + 1).padStart(2, '0')}</div>
                    <div>
                      <div className="serif" style={{ fontSize: 24, fontWeight: 500 }}>{item.name}</div>
                      <div style={{ color: 'var(--cream-3)', marginTop: 6, fontSize: 14 }}>{item.desc}</div>
                      <div className="mono" style={{ marginTop: 10, color: 'var(--mute)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Icon.Clock size={11} /> {item.duration}
                      </div>
                    </div>
                    <div className="serif" style={{ fontSize: 28, color: 'var(--gold)', whiteSpace: 'nowrap' }}>
                      {item.price ? `S/ ${item.price}` : '—'}
                    </div>
                    {isInCart ? (
                      <button
                        className="btn btn-ghost"
                        onClick={() => removeFromBooking(item.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                      >
                        <Icon.Check size={14} /> Añadido
                      </button>
                    ) : (
                      <button
                        className="btn btn-gold"
                        onClick={() => item.price ? addToBooking(item) : undefined}
                        style={!item.price ? { opacity: 0.5, cursor: 'default' } : undefined}
                        title={!item.price ? 'Precio bajo consulta — contactar por WhatsApp' : undefined}
                      >
                        {item.price ? 'Reservar' : 'Consultar'}
                      </button>
                    )}
                  </div>
                )
              })}

              {/* Alternative: WhatsApp booking */}
              <div style={{
                marginTop: 40, padding: 24, border: '1px solid var(--line)',
                background: 'var(--ink-2)', display: 'flex', alignItems: 'center',
                gap: 14, justifyContent: 'center', flexWrap: 'wrap',
              }}>
                <Icon.Whatsapp size={18} />
                <span style={{ fontSize: 14, color: 'var(--cream-3)' }}>
                  ¿Prefieres reservar por WhatsApp?{' '}
                  <a href="https://wa.me/51987654321" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>
                    Escríbenos
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .svc-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            .svc-row { grid-template-columns: 40px 1fr !important; gap: 14px !important; }
            .svc-row > div:nth-child(3), .svc-row > button { grid-column: 2; justify-self: start; }
          }
        `}</style>
      </section>

      {/* Checkout Modal */}
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        type="booking"
        items={bookingCart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price || 0,
        }))}
        title={`Reservar ${svc.name}`}
        subtitle={`${bookingCart.length} servicio${bookingCart.length !== 1 ? 's' : ''} · Adelanto 30%`}
      />
    </div>
  )
}
