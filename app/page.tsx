import Link from 'next/link'
import { getServices, getTestimonials } from '@/lib/queries'
import { SectionHead } from '@/components/shell'
import { Icon } from '@/components/icons'
import { HomeHero } from './_components/home-hero'
import { TestimonialGrid } from './_components/testimonial-grid'

export default async function HomePage() {
  const [services, testimonials] = await Promise.all([
    getServices(),
    getTestimonials(),
  ])

  return (
    <div className="page-home">
      {/* HERO */}
      <HomeHero />

      {/* THREE OFFICIOS */}
      <section style={{ paddingTop: 60, paddingBottom: 100 }}>
        <div className="container">
          <div className="reveal">
            <SectionHead eyebrow="Los tres oficios" title={<>Barbería, SPA y Vestuario, <em style={{ color: 'var(--gold)' }}>juntos.</em></>} lead="Cada rubro con su espacio, sus maestros y sus protocolos. Ninguno es un añadido; los tres son el centro." />
          </div>
          <div style={{ marginTop: 60, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: 'var(--line)' }} className="oficios-grid">
            {services.map((s, idx) => (
              <Link key={s.id} href={`/${s.id}`} style={{
                background: 'var(--ink)', padding: '48px 36px', display: 'flex', flexDirection: 'column',
                minHeight: 560, position: 'relative', cursor: 'pointer', textDecoration: 'none', color: 'inherit',
                transition: 'background 0.3s, transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.3s',
              }}>
                <div className="serif" style={{ fontSize: 120, lineHeight: 1, color: 'var(--line)', position: 'absolute', top: 20, right: 30 }}>0{idx + 1}</div>
                <div style={{ color: s.accent }}>
                  {s.id === 'barberia' && <Icon.Scissors size={28} />}
                  {s.id === 'spa' && <Icon.Sparkle size={28} />}
                  {s.id === 'vestuario' && <Icon.Hanger size={28} />}
                </div>
                <h3 className="serif" style={{ fontSize: 42, marginTop: 40, lineHeight: 1 }}>{s.name}</h3>
                <p style={{ color: 'var(--cream-3)', marginTop: 20, flex: 1, lineHeight: 1.65 }}>{s.description}</p>
                <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 12, color: 'var(--gold)' }}>
                  <span className="mono">Explorar {s.rubro.toLowerCase()}</span>
                  <Icon.Arrow size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .oficios-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* FEATURED RITUAL */}
      <section style={{ paddingTop: 60, paddingBottom: 100, background: 'var(--ink-2)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'center' }} className="ritual-grid">
            <div className="reveal-left">
              <div className="ph" data-label="RITUAL · Toalla caliente" style={{ aspectRatio: '4/5', border: '1px solid var(--line-2)' }} />
            </div>
            <div className="reveal-right">
              <div className="eyebrow" style={{ marginBottom: 20 }}>— El ritual destacado</div>
              <h2 className="serif" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1.05 }}>
                Ritual Caballero. <em style={{ color: 'var(--gold)' }}>Dos horas para reencontrarse.</em>
              </h2>
              <p style={{ marginTop: 24, fontSize: 17, lineHeight: 1.65, color: 'var(--cream-3)' }}>
                Facial profundo, masaje descontracturante y afeitado ritual. La experiencia
                completa de ACICALADOS en una sola visita.
              </p>
              <div style={{ marginTop: 32, borderTop: '1px solid var(--line)' }}>
                {[
                  ['Duración', '120 min'],
                  ['Incluye', 'Facial + masaje + afeitado'],
                  ['Desde', 'S/ 260'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 0', borderBottom: '1px solid var(--line)' }}>
                    <span className="mono" style={{ color: 'var(--mute)' }}>{k}</span>
                    <span className="serif" style={{ fontSize: 20 }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/reservar" className="btn btn-gold">Reservar ritual</Link>
                <Link href="/barberia" className="btn btn-ghost">Ver todos los servicios</Link>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .ritual-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialGrid testimonials={testimonials} />

      {/* UBICACIÓN */}
      <section style={{ paddingTop: 80, paddingBottom: 80, borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="reveal">
            <SectionHead eyebrow="Nuestra ubicación" title={<>Encuéntranos en <em style={{ color: 'var(--gold)' }}>Ayacucho.</em></>} lead="Estamos en el corazón de la ciudad. Visítanos y vive la experiencia ACICALADOS." align="center" />
          </div>
          <div style={{ marginTop: 50, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: 'var(--line)' }} className="ubicacion-grid">
            <div style={{ position: 'relative', background: 'var(--ink-2)', minHeight: 400 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3894.9700706224057!2d-73.83491920321043!3d-12.518141699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910d3d42e669f4f9%3A0x2aca54dcda907e97!2sSpa%20Acicalados%20Barber%20Shop!5e0!3m2!1sen!2spe!4v1776724024218!5m2!1sen!2spe"
                width="100%" height="100%"
                style={{ border: 0, display: 'block', filter: 'grayscale(0.3) contrast(1.1)', position: 'absolute', inset: 0 }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Spa Acicalados Barber Shop en Google Maps"
              />
              <a href="https://maps.app.goo.gl/KmBZZveJsVEPtf3t8" target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ position: 'absolute', bottom: 20, left: 20, textDecoration: 'none', zIndex: 5 }}>
                Abrir en Maps <Icon.Ext size={12} />
              </a>
            </div>
            <div style={{ background: 'var(--ink)', padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 28 }}>— Datos de contacto</div>
              <div style={{ display: 'grid', gap: 28 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--gold)', marginTop: 2 }}><Icon.Pin size={20} /></div>
                  <div>
                    <div className="mono" style={{ color: 'var(--mute)', fontSize: 11 }}>DIRECCIÓN</div>
                    <div style={{ marginTop: 6, lineHeight: 1.5 }}>Av. Conquistadores 642<br />San Isidro, Lima 15073</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--gold)', marginTop: 2 }}><Icon.Phone size={20} /></div>
                  <div>
                    <div className="mono" style={{ color: 'var(--mute)', fontSize: 11 }}>TELÉFONO</div>
                    <div style={{ marginTop: 6 }}>+51 987 654 321</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--gold)', marginTop: 2 }}><Icon.Clock size={20} /></div>
                  <div>
                    <div className="mono" style={{ color: 'var(--mute)', fontSize: 11 }}>HORARIO</div>
                    <div style={{ marginTop: 6, lineHeight: 1.5 }}>Lun – Sáb · 10:00 a 21:00<br />Dom · con cita previa</div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href="https://wa.me/51987654321" target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ textDecoration: 'none' }}>
                  <Icon.Whatsapp size={14} /> WhatsApp directo
                </a>
                <Link href="/contacto" className="btn btn-ghost">Más contacto</Link>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .ubicacion-grid { grid-template-columns: 1fr !important; } .ubicacion-grid > div:first-child { min-height: 300px !important; } }`}</style>
      </section>

      {/* CTA */}
      <section style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <div className="reveal-scale" style={{
            background: 'linear-gradient(135deg, var(--ink-3), var(--ink-2))',
            border: '1px solid var(--line-2)', padding: '80px 60px',
            display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40, alignItems: 'center',
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,163,106,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div>
              <div className="eyebrow" style={{ marginBottom: 20 }}>— Agenda abierta</div>
              <h2 className="serif" style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.05 }}>
                Reserva hoy. <em style={{ color: 'var(--gold)' }}>Tu cita te espera.</em>
              </h2>
              <p style={{ marginTop: 20, color: 'var(--cream-3)' }}>Confirmación inmediata por WhatsApp. Adelanto del 30% para asegurar horario.</p>
            </div>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <Link href="/reservar" className="btn btn-gold">Reservar ahora</Link>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 800px) { .cta-grid { grid-template-columns: 1fr !important; padding: 50px 30px !important; } }`}</style>
      </section>
    </div>
  )
}
