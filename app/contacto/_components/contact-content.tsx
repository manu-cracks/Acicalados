'use client'

import { useState } from 'react'
import type { FAQ } from '@/types'
import { Icon } from '@/components/icons'
import { FieldInput } from '@/components/field-input'

export function ContactContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState(0)
  const [sent, setSent] = useState(false)

  return (
    <div>
      <section style={{ paddingTop: 80, paddingBottom: 40 }}>
        <div className="container">
          <div className="fade-up">
            <div className="eyebrow" style={{ marginBottom: 20 }}>— Contacto</div>
            <h1 className="serif" style={{ fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 1, fontWeight: 500 }}>
              Ven, llama, <em style={{ color: 'var(--gold)' }}>escríbenos.</em>
            </h1>
            <p style={{ marginTop: 20, fontSize: 17, color: 'var(--cream-3)', maxWidth: 620 }}>
              Estamos en San Isidro, a un paso del parque. Atendemos de lunes a sábado.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 0 80px', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60 }} className="contact-grid">
            <div>
              <h2 className="serif" style={{ fontSize: 32, marginBottom: 24 }}>Escríbenos un mensaje</h2>
              {!sent ? (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} style={{ display: 'grid', gap: 16 }}>
                  <FieldInput label="Nombre" placeholder="Tu nombre" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <FieldInput label="Teléfono" placeholder="+51 987 654 321" />
                    <FieldInput label="Correo" placeholder="tu@correo.com" />
                  </div>
                  <label>
                    <div className="mono" style={{ color: 'var(--mute)', marginBottom: 8 }}>Motivo</div>
                    <select className="field-input">
                      <option>Consulta general</option>
                      <option>Reserva o cita</option>
                      <option>Alquiler de vestuario</option>
                      <option>Pedido de productos</option>
                      <option>Otro</option>
                    </select>
                  </label>
                  <label>
                    <div className="mono" style={{ color: 'var(--mute)', marginBottom: 8 }}>Mensaje</div>
                    <textarea placeholder="Cuéntanos en qué podemos ayudarte…" rows={5} className="field-input" style={{ resize: 'vertical' }} />
                  </label>
                  <button type="submit" className="btn btn-gold" style={{ justifySelf: 'start', marginTop: 10 }}>Enviar mensaje</button>
                </form>
              ) : (
                <div style={{ padding: 40, border: '1px solid var(--gold)', textAlign: 'center' }}>
                  <div style={{ color: 'var(--gold)' }}><Icon.Check size={32} /></div>
                  <h3 className="serif" style={{ fontSize: 26, marginTop: 16 }}>Mensaje enviado</h3>
                  <p style={{ color: 'var(--cream-3)', marginTop: 10 }}>Te responderemos en menos de 24 horas hábiles.</p>
                </div>
              )}
            </div>
            <aside>
              <div style={{ padding: 30, border: '1px solid var(--line-2)', background: 'var(--ink-2)' }}>
                <div className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 18 }}>— Datos de contacto</div>
                <div style={{ display: 'grid', gap: 20 }}>
                  {[
                    { icon: <Icon.Pin size={18} />, label: 'DIRECCIÓN', value: <>Av. Conquistadores 642<br />San Isidro, Lima 15073</> },
                    { icon: <Icon.Phone size={18} />, label: 'TELÉFONO', value: '+51 987 654 321' },
                    { icon: <Icon.Mail size={18} />, label: 'CORREO', value: 'hola@acicalados.pe' },
                    { icon: <Icon.Clock size={18} />, label: 'HORARIO', value: <>Lun – Sáb · 10:00 a 21:00<br />Dom · con cita previa</> },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14 }}>
                      <div style={{ color: 'var(--gold)' }}>{item.icon}</div>
                      <div>
                        <div className="mono" style={{ color: 'var(--mute)' }}>{item.label}</div>
                        <div style={{ marginTop: 4 }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <a href="https://wa.me/51987654321" target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ width: '100%', marginTop: 24, textDecoration: 'none' }}>
                  <Icon.Whatsapp size={14} /> WhatsApp directo
                </a>
              </div>
            </aside>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
      </section>

      {/* Map */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 16 }}>— Cómo llegar</div>
          <div style={{ position: 'relative', border: '1px solid var(--line-2)', overflow: 'hidden', background: 'var(--ink-2)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3894.9700706224057!2d-73.83491920321043!3d-12.518141699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910d3d42e669f4f9%3A0x2aca54dcda907e97!2sSpa%20Acicalados%20Barber%20Shop!5e0!3m2!1sen!2spe!4v1776724024218!5m2!1sen!2spe"
              width="100%" height="440"
              style={{ border: 0, display: 'block', filter: 'grayscale(0.3) contrast(1.1)' }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Spa Acicalados Barber Shop en Google Maps"
            />
            <a href="https://maps.app.goo.gl/KmBZZveJsVEPtf3t8" target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ position: 'absolute', bottom: 20, right: 20, textDecoration: 'none', zIndex: 5 }}>
              Abrir en Google Maps <Icon.Ext size={12} />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '60px 0 80px', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80 }} className="faq-grid">
            <div>
              <div className="eyebrow" style={{ marginBottom: 20 }}>— Preguntas frecuentes</div>
              <h2 className="serif" style={{ fontSize: 44, lineHeight: 1.05 }}>Lo que <em style={{ color: 'var(--gold)' }}>suelen preguntarnos.</em></h2>
            </div>
            <div>
              {faqs.map((f, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} style={{
                    width: '100%', padding: '24px 0', display: 'flex', justifyContent: 'space-between',
                    textAlign: 'left', alignItems: 'center', gap: 20
                  }}>
                    <span className="serif" style={{ fontSize: 22, color: openFaq === i ? 'var(--gold)' : 'var(--cream)' }}>{f.q}</span>
                    <span style={{ color: 'var(--gold)', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>
                      <Icon.Plus size={18} />
                    </span>
                  </button>
                  {openFaq === i && (
                    <div style={{ paddingBottom: 24, color: 'var(--cream-3)', lineHeight: 1.65, maxWidth: 640, animation: 'fadeIn 0.3s ease' }}>
                      {f.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .faq-grid { grid-template-columns: 1fr !important; gap: 30px !important; } }`}</style>
      </section>
    </div>
  )
}
