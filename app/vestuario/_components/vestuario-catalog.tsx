'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { VestuarioItem } from '@/types'
import { SectionHead } from '@/components/shell'
import { Icon } from '@/components/icons'
import { CheckoutModal } from '@/components/checkout-modal'

const statusColor = (s: string) => ({
  'Disponible': 'var(--ok)', 'Reservado': 'var(--gold)', 'En uso': 'var(--copper)', 'En mantenimiento': 'var(--mute)'
}[s] || 'var(--mute)')

export function VestuarioCatalog({ items }: { items: VestuarioItem[] }) {
  const [cat, setCat] = useState('Todos')
  const [selectedItem, setSelectedItem] = useState<VestuarioItem | null>(null)
  
  const cats = ['Todos', 'Novio', 'Smoking', 'Gala', 'Ejecutivo', 'Chaqué']
  const filtered = cat === 'Todos' ? items : items.filter(i => i.category === cat)

  return (
    <section style={{ padding: '80px 0 100px' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 20, marginBottom: 30 }}>
          <SectionHead eyebrow="Catálogo" title="Nuestras piezas" />
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)} className="mono" style={{
                color: cat === c ? 'var(--gold)' : 'var(--cream-3)', padding: '4px 0'
              }}>{c}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, background: 'var(--line)' }} className="vest-grid">
          {filtered.map(item => (
            <article key={item.id} style={{ background: 'var(--ink)', padding: 20, display: 'flex', flexDirection: 'column' }}>
              <div className="ph" data-label={item.name} style={{ aspectRatio: '3/4', border: '1px solid var(--line)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(11,9,8,0.85)', padding: '5px 10px', border: '1px solid', borderColor: statusColor(item.status), color: statusColor(item.status), fontSize: 10, fontFamily: 'var(--mono)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {item.status}
                </div>
              </div>
              <div className="mono" style={{ color: 'var(--gold)', marginTop: 16 }}>{item.category}</div>
              <h3 className="serif" style={{ fontSize: 20, marginTop: 6, lineHeight: 1.2 }}>{item.name}</h3>
              <p style={{ color: 'var(--cream-3)', fontSize: 13, marginTop: 8, lineHeight: 1.5, flex: 1 }}>{item.desc}</p>
              
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
                {item.status === 'Disponible' ? (
                  <button 
                    onClick={() => setSelectedItem(item)}
                    className="btn btn-gold" 
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  >
                    Separar (S/ {item.deposit})
                  </button>
                ) : (
                  <button className="btn btn-ghost" disabled style={{ width: '100%', opacity: 0.5 }}>
                    No disponible
                  </button>
                )}
                <div className="mono" style={{ color: 'var(--mute)', fontSize: 11, textAlign: 'center', marginTop: 10 }}>
                  Alquiler bajo consulta
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .vest-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 500px) { .vest-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <CheckoutModal
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        type="vestuario"
        items={selectedItem ? [{
          id: selectedItem.id,
          name: selectedItem.name,
          price: 0,
          deposit: selectedItem.deposit,
        }] : []}
        title="Separar vestuario"
        subtitle="Pago de garantía para asegurar la reserva"
      />
    </section>
  )
}
