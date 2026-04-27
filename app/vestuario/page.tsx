import type { Metadata } from 'next'
import Link from 'next/link'
import { getVestuarioItems } from '@/lib/queries'
import { SectionHead } from '@/components/shell'
import { Icon } from '@/components/icons'
import { VestuarioCatalog } from './_components/vestuario-catalog'

export const metadata: Metadata = {
  title: 'Vestuario — ACICALADOS',
  description: 'Trajes de novio, smokings y piezas formales con ajuste profesional y acompañamiento personalizado.',
}

export default async function VestuarioPage() {
  const items = await getVestuarioItems()

  return (
    <div>
      {/* Hero */}
      <section style={{ paddingTop: 80, paddingBottom: 60 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end' }} className="vest-hero">
            <div className="fade-up">
              <div className="eyebrow" style={{ marginBottom: 20 }}>— Alquiler de vestuario</div>
              <h1 className="serif" style={{ fontSize: 'clamp(42px, 6.5vw, 96px)', lineHeight: 0.95, fontWeight: 500 }}>
                Para el día<br /><em style={{ color: 'var(--gold)' }}>que no se repite.</em>
              </h1>
              <p style={{ marginTop: 24, fontSize: 17, lineHeight: 1.65, color: 'var(--cream-3)', maxWidth: 520 }}>
                Trajes de novio, smokings y protocolo. Atención con cita, ajuste profesional
                y acompañamiento de recepción durante toda la experiencia.
              </p>
              <div style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/reservar" className="btn btn-gold">Solicitar cita</Link>
              </div>
            </div>
            <div className="ph" data-label="VESTUARIO · Showroom" style={{ aspectRatio: '4/5', border: '1px solid var(--line-2)' }} />
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .vest-hero { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* Notice strip */}
      <section style={{ background: 'var(--ink-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, padding: '32px 0' }}>
            {[
              { n: '01', t: 'Sin precios en catálogo', d: 'Cada alquiler se personaliza según modelo, accesorios y fechas. Precio final acordado con recepción.' },
              { n: '02', t: 'Verificación requerida', d: 'DNI (ambas caras), selfie con DNI, teléfono, dirección y medidas antes de confirmar.' },
              { n: '03', t: 'Depósito de garantía', d: 'Se cobra un depósito al confirmar la cita. Se devuelve al retornar la pieza en buen estado.' },
            ].map(x => (
              <div key={x.n} style={{ borderLeft: '1px solid var(--gold)', paddingLeft: 18 }}>
                <div className="mono" style={{ color: 'var(--gold)' }}>{x.n}</div>
                <div className="serif" style={{ fontSize: 22, marginTop: 6 }}>{x.t}</div>
                <p style={{ color: 'var(--cream-3)', marginTop: 8, fontSize: 14, lineHeight: 1.55 }}>{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog */}
      <VestuarioCatalog items={items} />

      {/* Process */}
      <section style={{ padding: '60px 0 100px', background: 'var(--ink-2)' }}>
        <div className="container">
          <SectionHead eyebrow="El proceso" title={<>Cómo funciona <em style={{ color: 'var(--gold)' }}>el alquiler.</em></>} />
          <div style={{ marginTop: 50, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 40, position: 'relative' }} className="proc-grid">
            <div style={{ position: 'absolute', top: 30, left: '10%', right: '10%', height: 1, background: 'var(--line)' }} />
            {[
              { t: 'Reserva', d: 'Eliges fecha y modelo en línea o por WhatsApp.' },
              { t: 'Verificación', d: 'Subes DNI, selfie y datos de contacto.' },
              { t: 'Medidas', d: 'Recepción coordina visita para ajuste.' },
              { t: 'Depósito', d: 'Se cobra el depósito y se confirma la cita.' },
              { t: 'Entrega', d: 'Recoges el día del evento. Devolución en 48h.' },
            ].map((p, i) => (
              <div key={i} style={{ position: 'relative', background: 'var(--ink-2)', paddingTop: 0 }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', border: '1px solid var(--gold)', background: 'var(--ink-2)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--serif)', fontSize: 24, position: 'relative', zIndex: 2 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="serif" style={{ fontSize: 22, marginTop: 20 }}>{p.t}</div>
                <p style={{ color: 'var(--cream-3)', fontSize: 13, lineHeight: 1.55, marginTop: 8 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .proc-grid { grid-template-columns: 1fr !important; } .proc-grid > div:first-child { display: none; } }`}</style>
      </section>
    </div>
  )
}
