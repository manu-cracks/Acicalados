'use client'

import Link from 'next/link'
import { Icon } from '@/components/icons'

export function HomeHero() {
  return (
    <section style={{ position: 'relative', paddingTop: 80, paddingBottom: 120, overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)', gap: 64, alignItems: 'center' }} className="hero-grid">
          <div className="fade-up">
            <div className="eyebrow" style={{ marginBottom: 28 }}>— Establecido MMXXV · San Isidro, Lima</div>
            <h1 className="serif" style={{
              fontSize: 'clamp(48px, 7.5vw, 112px)', lineHeight: 0.92, fontWeight: 500,
              letterSpacing: '-0.02em',
            }}>
              El arte<br />
              del hombre <em style={{ color: 'var(--gold)', fontWeight: 400, fontStyle: 'italic' }}>bien<br />acicalado.</em>
            </h1>
            <p style={{ marginTop: 32, fontSize: 18, lineHeight: 1.65, color: 'var(--cream-3)', maxWidth: 500 }}>
              Barbería tradicional, rituales de SPA y vestuario de ocasión.
              Un mismo techo, tres oficios, una misma obsesión por el detalle.
            </p>
            <div style={{ marginTop: 44, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/reservar" className="btn btn-gold">
                Reservar cita <Icon.Arrow size={14} />
              </Link>
              <Link href="/barberia" className="btn btn-ghost">
                Ver servicios
              </Link>
            </div>
            <div style={{ marginTop: 60, display: 'flex', gap: 40, flexWrap: 'wrap' }} className="stagger">
              {[
                { k: '2025', v: 'Fundado en Ayacucho' },
                { k: '3', v: 'Oficios bajo un techo' },
                { k: '4.9', v: 'Reseñas Google (280+)' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="serif" style={{ fontSize: 32, color: 'var(--gold)' }}>{s.k}</div>
                  <div className="mono" style={{ color: 'var(--mute)', marginTop: 4 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-up" style={{ animationDelay: '0.15s', position: 'relative' }}>
            <div className="ph" data-label="HERO · Barbero retrato" style={{ aspectRatio: '3/4', border: '1px solid var(--line)' }}>
              <svg viewBox="0 0 300 400" style={{ width: '100%', height: '100%', opacity: 0.35 }}>
                <defs>
                  <linearGradient id="hg" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#2A231C" />
                    <stop offset="1" stopColor="#0B0908" />
                  </linearGradient>
                </defs>
                <rect width="300" height="400" fill="url(#hg)" />
                <circle cx="150" cy="150" r="60" fill="#3A2F24" opacity="0.4" />
                <rect x="100" y="200" width="100" height="180" fill="#3A2F24" opacity="0.4" />
              </svg>
            </div>
            <div style={{
              position: 'absolute', bottom: -24, left: -24, background: 'var(--ink-2)',
              border: '1px solid var(--line-2)', padding: '20px 26px', maxWidth: 260,
              animation: 'float 4s ease-in-out infinite'
            }}>
              <div className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 8 }}>Nº 01</div>
              <div className="serif" style={{ fontSize: 20, lineHeight: 1.2 }}>El ritual de afeitado con toalla caliente.</div>
            </div>
          </div>
        </div>
      </div>
      <div className="marquee" style={{
        marginTop: 80, padding: '20px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
        overflow: 'hidden', whiteSpace: 'nowrap'
      }}>
        <div style={{ display: 'inline-block', animation: 'scroll 40s linear infinite' }}>
          {Array(2).fill(0).map((_, k) => (
            <span key={k}>
              {['TIJERA & NAVAJA', 'TOALLA CALIENTE', 'CUERO & LINO', 'RITUAL CABALLERO', 'ALQUILER DE TRAJES', 'SPA MASCULINO', 'SAN ISIDRO · LIMA'].map((t, i) => (
                <span key={i} className="serif" style={{ fontSize: 36, margin: '0 40px', color: i % 2 ? 'var(--cream)' : 'var(--gold)', fontStyle: i % 3 === 0 ? 'italic' : 'normal' }}>
                  {t} <span style={{ color: 'var(--mute)' }}>✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </section>
  )
}
