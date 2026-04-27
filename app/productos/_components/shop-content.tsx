'use client'

import { useState } from 'react'
import type { Product, CartItem } from '@/types'
import { Icon } from '@/components/icons'
import { CheckoutModal } from '@/components/checkout-modal'

export function ShopContent({ products }: { products: Product[] }) {
  const [cat, setCat] = useState('Todos')
  const [cart, setCart] = useState<CartItem[]>([])
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const categories = ['Todos', ...new Set(products.map(p => p.cat))]
  const filtered = cat === 'Todos' ? products : products.filter(p => p.cat === cat)

  const addToCart = (p: Product) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === p.id)
      if (existing) return prev.map(c => c.id === p.id ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { ...p, qty: 1 }]
    })
  }
  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(c => c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0))
  }
  const total = cart.reduce((s, c) => s + c.qty * c.price, 0)

  return (
    <div>
      <section style={{ paddingTop: 80, paddingBottom: 40 }}>
        <div className="container">
          <div className="fade-up">
            <div className="eyebrow" style={{ marginBottom: 20 }}>— Productos</div>
            <h1 className="serif" style={{ fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 1, fontWeight: 500 }}>
              Productos para <em style={{ color: 'var(--gold)' }}>el cuidado diario.</em>
            </h1>
            <p style={{ marginTop: 20, fontSize: 17, color: 'var(--cream-3)', maxWidth: 620 }}>
              Selección curada: aceites, bálsamos, herramientas y kits.
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 40, paddingBottom: 100, borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 340px', gap: 40 }} className="shop-grid">
            <aside style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
              <div className="mono" style={{ color: 'var(--gold)', marginBottom: 20 }}>CATEGORÍAS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {categories.map(c => (
                  <button key={c} onClick={() => setCat(c)} style={{
                    padding: '10px 0', textAlign: 'left', fontSize: 15, fontFamily: 'var(--serif)',
                    color: cat === c ? 'var(--gold)' : 'var(--cream)', borderBottom: '1px solid var(--line)',
                    display: 'flex', justifyContent: 'space-between'
                  }}>
                    <span>{c}</span>
                    <span className="mono" style={{ color: 'var(--mute)' }}>
                      {c === 'Todos' ? products.length : products.filter(p => p.cat === c).length}
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, background: 'var(--line)' }} className="prod-grid">
                {filtered.map(p => (
                  <article key={p.id} style={{ background: 'var(--ink)', padding: 24, display: 'flex', flexDirection: 'column' }}>
                    <div className="ph" data-label={p.name} style={{ aspectRatio: '1/1', border: '1px solid var(--line)' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, alignItems: 'baseline' }}>
                      <span className="mono" style={{ color: 'var(--gold)' }}>{p.cat}</span>
                      <span className="mono" style={{ color: p.stock <= 5 ? 'var(--copper)' : 'var(--mute)' }}>
                        {p.stock <= 5 ? `Quedan ${p.stock}` : 'En stock'}
                      </span>
                    </div>
                    <h3 className="serif" style={{ fontSize: 22, marginTop: 10, lineHeight: 1.15 }}>{p.name}</h3>
                    <p style={{ color: 'var(--cream-3)', fontSize: 13, marginTop: 10, lineHeight: 1.5, flex: 1 }}>{p.desc}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--line)' }}>
                      <span className="serif" style={{ fontSize: 26, color: 'var(--gold)' }}>S/ {p.price}</span>
                      <button className="btn btn-ghost" onClick={() => addToCart(p)} style={{ padding: '10px 18px' }}>
                        <Icon.Plus size={12} /> Añadir
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
              <div style={{ border: '1px solid var(--line-2)', padding: 24, background: 'var(--ink-2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
                  <div>
                    <div className="eyebrow" style={{ color: 'var(--gold)' }}>— Tu pedido</div>
                    <div className="serif" style={{ fontSize: 24, marginTop: 4 }}>Carrito</div>
                  </div>
                  <div className="mono" style={{ color: 'var(--mute)' }}>{cart.length} items</div>
                </div>
                {cart.length === 0 ? (
                  <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--mute)' }}>
                    <Icon.Cart size={32} />
                    <div style={{ marginTop: 12, fontSize: 13 }}>Tu carrito está vacío</div>
                  </div>
                ) : (
                  <>
                    <div style={{ maxHeight: 320, overflowY: 'auto', padding: '16px 0' }}>
                      {cart.map(c => (
                        <div key={c.id} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
                          <div className="ph" style={{ width: 60, height: 60, flexShrink: 0 }} data-label="" />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{c.name}</div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <button onClick={() => updateQty(c.id, -1)} style={{ width: 22, height: 22, border: '1px solid var(--line-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.Minus size={10} /></button>
                                <span className="mono">{c.qty}</span>
                                <button onClick={() => updateQty(c.id, 1)} style={{ width: 22, height: 22, border: '1px solid var(--line-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.Plus size={10} /></button>
                              </div>
                              <span className="mono" style={{ color: 'var(--gold)' }}>S/ {c.qty * c.price}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ paddingTop: 16, borderTop: '1px solid var(--line)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderTop: '1px solid var(--line)', marginTop: 8 }}>
                        <span className="serif" style={{ fontSize: 18 }}>Total</span>
                        <span className="serif" style={{ fontSize: 22, color: 'var(--gold)' }}>S/ {total}</span>
                      </div>
                      <button
                        className="btn btn-gold"
                        style={{ width: '100%', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                        onClick={() => setCheckoutOpen(true)}
                      >
                        <Icon.CreditCard size={16} />
                        Continuar al pago
                      </button>
                      <div style={{
                        marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: 6, color: 'var(--mute)', fontSize: 11,
                      }}>
                        <Icon.Lock size={10} />
                        <span>Pago seguro · Yape · Tarjetas · PagoEfectivo</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </aside>
          </div>
        </div>
        <style>{`
          @media (max-width: 1100px) { .shop-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 600px) { .prod-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* Checkout Modal */}
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        type="products"
        items={cart.map(c => ({
          id: c.id,
          name: c.name,
          price: c.price,
          qty: c.qty,
        }))}
        title="Comprar productos"
        subtitle={`${cart.length} producto${cart.length !== 1 ? 's' : ''} · S/ ${total}`}
      />
    </div>
  )
}
