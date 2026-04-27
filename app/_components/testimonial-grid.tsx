import type { Testimonial } from '@/types'
import { SectionHead } from '@/components/shell'
import { Icon } from '@/components/icons'

export function TestimonialGrid({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="container">
        <div className="reveal">
          <SectionHead eyebrow="Lo que dicen" title={<>En palabras de <em style={{ color: 'var(--gold)' }}>quienes vuelven.</em></>} align="center" />
        </div>
        <div style={{ marginTop: 60, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, background: 'var(--line)' }} className="test-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="reveal" style={{
              background: 'var(--ink)', padding: 40,
              transition: 'background 0.3s',
            }}>
              <div style={{ display: 'flex', gap: 3, color: 'var(--gold)' }}>
                {Array(5).fill(0).map((_, k) => <Icon.Star key={k} size={14} />)}
              </div>
              <blockquote className="serif" style={{ fontSize: 22, lineHeight: 1.4, marginTop: 20, fontStyle: 'italic' }}>
                &quot;{t.quote}&quot;
              </blockquote>
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--line)' }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{t.name}</div>
                <div className="mono" style={{ color: 'var(--mute)', marginTop: 4 }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 700px) { .test-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
