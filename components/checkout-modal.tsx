'use client'

import { useState, useEffect, useCallback } from 'react'
import { Icon } from '@/components/icons'

// ─── Types ──────────────────────────────────────────────────────────
interface CheckoutItem {
  id: string
  name: string
  price: number
  qty?: number
  deposit?: number
}

interface CheckoutModalProps {
  open: boolean
  onClose: () => void
  type: 'products' | 'booking' | 'vestuario'
  items: CheckoutItem[]
  title?: string
  subtitle?: string
}

// ─── Component ──────────────────────────────────────────────────────
export function CheckoutModal({
  open,
  onClose,
  type,
  items,
  title = 'Finalizar pedido',
  subtitle,
}: CheckoutModalProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Calculate amounts
  const rawTotal = items.reduce((sum, item) => {
    if (type === 'vestuario') return sum + (item.deposit || 300)
    return sum + item.price * (item.qty || 1)
  }, 0)

  const isAdvance = type === 'booking'
  const payAmount = isAdvance ? Math.ceil(rawTotal * 0.3) : rawTotal
  const label = type === 'vestuario' ? 'Depósito de garantía' : isAdvance ? 'Adelanto (30%)' : 'Total'

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on ESC
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, handleKeyDown])

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError('El correo electrónico es obligatorio')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Ingresa un correo electrónico válido')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          items: items.map(i => ({
            id: i.id,
            name: i.name,
            price: i.price,
            qty: i.qty || 1,
            deposit: i.deposit,
          })),
          email: email.trim(),
          name: name.trim(),
          phone: phone.trim(),
          notes: notes.trim(),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error al procesar el pago')
      }

      // Redirect to Flow payment page
      window.location.href = `${data.url}?token=${data.token}`
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado. Inténtalo de nuevo.')
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(6px)',
        }}
      />

      {/* Modal */}
      <div
        className="checkout-modal-enter"
        style={{
          position: 'relative', width: '100%', maxWidth: 540,
          maxHeight: '90vh', overflowY: 'auto',
          background: 'var(--ink)', border: '1px solid var(--line-2)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 24px', borderBottom: '1px solid var(--line)',
          position: 'sticky', top: 0, background: 'var(--ink)', zIndex: 1,
        }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 4 }}>— {label}</div>
            <div className="serif" style={{ fontSize: 22 }}>{title}</div>
            {subtitle && <div style={{ color: 'var(--cream-3)', fontSize: 13, marginTop: 4 }}>{subtitle}</div>}
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            style={{
              width: 36, height: 36, display: 'flex', alignItems: 'center',
              justifyContent: 'center', border: '1px solid var(--line-2)',
              color: 'var(--cream)', transition: 'border-color 0.2s',
            }}
          >
            <Icon.Close size={16} />
          </button>
        </div>

        {/* Order summary */}
        <div style={{ padding: '16px 24px', background: 'var(--ink-2)', borderBottom: '1px solid var(--line)' }}>
          <div className="mono" style={{ color: 'var(--mute)', marginBottom: 12 }}>RESUMEN DEL PEDIDO</div>
          {items.map((item) => (
            <div key={item.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px 0', borderBottom: '1px solid var(--line)',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</div>
                {(item.qty || 1) > 1 && (
                  <span className="mono" style={{ color: 'var(--mute)', fontSize: 12 }}>×{item.qty}</span>
                )}
              </div>
              <span className="mono" style={{ color: 'var(--gold)' }}>
                S/ {type === 'vestuario' ? (item.deposit || 300) : item.price * (item.qty || 1)}
              </span>
            </div>
          ))}

          {isAdvance && (
            <div style={{
              marginTop: 12, padding: 12, background: 'rgba(184,130,58,0.1)',
              border: '1px solid rgba(184,130,58,0.3)', fontSize: 13, color: 'var(--gold)',
              display: 'flex', gap: 10, alignItems: 'center',
            }}>
              <Icon.Shield size={16} />
              <span>Se cobra solo el <strong>30%</strong> como adelanto (S/ {payAmount}). El resto se paga en la cita.</span>
            </div>
          )}

          {type === 'vestuario' && (
            <div style={{
              marginTop: 12, padding: 12, background: 'rgba(184,130,58,0.1)',
              border: '1px solid rgba(184,130,58,0.3)', fontSize: 13, color: 'var(--gold)',
              display: 'flex', gap: 10, alignItems: 'center',
            }}>
              <Icon.Shield size={16} />
              <span>El depósito se devuelve al retornar la pieza en buen estado.</span>
            </div>
          )}

          <div style={{
            display: 'flex', justifyContent: 'space-between', marginTop: 16, paddingTop: 12,
            borderTop: '1px solid var(--line)',
          }}>
            <span className="serif" style={{ fontSize: 18 }}>{label}</span>
            <span className="serif" style={{ fontSize: 24, color: 'var(--gold)' }}>S/ {payAmount}</span>
          </div>
        </div>

        {/* Form */}
        <div style={{ padding: '20px 24px', display: 'grid', gap: 16 }}>
          <div className="mono" style={{ color: 'var(--mute)' }}>DATOS DE CONTACTO</div>

          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--cream-3)', marginBottom: 6 }}>
              Correo electrónico *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              style={{
                width: '100%', padding: '12px 14px',
                background: 'var(--ink-2)', border: '1px solid var(--line-2)',
                color: 'var(--cream)', fontSize: 15,
                outline: 'none', transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--gold)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--line-2)'}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: 'var(--cream-3)', marginBottom: 6 }}>
                Nombre
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                style={{
                  width: '100%', padding: '12px 14px',
                  background: 'var(--ink-2)', border: '1px solid var(--line-2)',
                  color: 'var(--cream)', fontSize: 15,
                  outline: 'none', transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--gold)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--line-2)'}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: 'var(--cream-3)', marginBottom: 6 }}>
                Teléfono
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="987 654 321"
                style={{
                  width: '100%', padding: '12px 14px',
                  background: 'var(--ink-2)', border: '1px solid var(--line-2)',
                  color: 'var(--cream)', fontSize: 15,
                  outline: 'none', transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--gold)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--line-2)'}
              />
            </div>
          </div>

          {(type === 'booking' || type === 'vestuario') && (
            <div>
              <label style={{ display: 'block', fontSize: 13, color: 'var(--cream-3)', marginBottom: 6 }}>
                Notas o preferencias
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={type === 'vestuario'
                  ? 'Fecha del evento, talla aproximada, accesorios...'
                  : 'Fecha y hora preferida, barbero preferido...'}
                rows={3}
                style={{
                  width: '100%', padding: '12px 14px',
                  background: 'var(--ink-2)', border: '1px solid var(--line-2)',
                  color: 'var(--cream)', fontSize: 15, resize: 'vertical',
                  outline: 'none', transition: 'border-color 0.2s',
                  fontFamily: 'inherit',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--gold)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--line-2)'}
              />
            </div>
          )}

          {error && (
            <div style={{
              padding: 12, background: 'rgba(200,60,60,0.1)',
              border: '1px solid rgba(200,60,60,0.3)',
              color: '#e57373', fontSize: 13,
            }}>
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px 24px', borderTop: '1px solid var(--line)',
          position: 'sticky', bottom: 0, background: 'var(--ink)',
        }}>
          <button
            className="btn btn-gold"
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%', padding: '16px 24px', fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'wait' : 'pointer',
            }}
          >
            {loading ? (
              <>
                <Icon.Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
                Procesando...
              </>
            ) : (
              <>
                <Icon.Lock size={16} />
                Pagar S/ {payAmount}
              </>
            )}
          </button>
          <div style={{
            marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 8, color: 'var(--mute)', fontSize: 12,
          }}>
            <Icon.Shield size={12} />
            <span>Pago seguro con FlowPagos · Yape · Tarjetas · PagoEfectivo</span>
          </div>
        </div>

        <style>{`
          .checkout-modal-enter {
            animation: modalSlideUp 0.3s ease-out;
          }
          @keyframes modalSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </div>
  )
}
