import type { Metadata } from 'next'
import Link from 'next/link'
import { Icon } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Reservar — ACICALADOS',
  description: 'Reserva tu cita en ACICALADOS. Barbería, SPA o vestuario.',
}

export default function ReservarPage() {
  return (
    <div>
      <section style={{ paddingTop: 80, paddingBottom: 100 }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <div className="fade-up">
            <div className="eyebrow" style={{ marginBottom: 20 }}>— Reservar cita</div>
            <h1 className="serif" style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05, fontWeight: 500 }}>
              Reserva tu <em style={{ color: 'var(--gold)' }}>experiencia.</em>
            </h1>
            <p style={{ marginTop: 24, fontSize: 17, color: 'var(--cream-3)', lineHeight: 1.65 }}>
              Elige el servicio que deseas y te guiaremos en el proceso de reserva. Confirmación inmediata por WhatsApp.
            </p>
            <div style={{ marginTop: 40, display: 'grid', gap: 16 }}>
              <Link href="/barberia" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'space-between', textDecoration: 'none' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Icon.Scissors size={16} /> Barbería
                </span>
                <Icon.Arrow size={14} />
              </Link>
              <Link href="/spa" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'space-between', textDecoration: 'none' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Icon.Sparkle size={16} /> SPA
                </span>
                <Icon.Arrow size={14} />
              </Link>
              <Link href="/vestuario" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'space-between', textDecoration: 'none' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Icon.Hanger size={16} /> Vestuario
                </span>
                <Icon.Arrow size={14} />
              </Link>
            </div>
            <div style={{ marginTop: 40, padding: 20, border: '1px solid var(--line)', background: 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'center' }}>
              <Icon.Whatsapp size={18} />
              <span style={{ fontSize: 14, color: 'var(--cream-3)' }}>¿Prefieres reservar por WhatsApp? <a href="https://wa.me/51987654321" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>Escríbenos</a></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
