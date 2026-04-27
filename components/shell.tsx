'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@/components/icons'
import { NAV_ITEMS } from '@/lib/data'

const BrandMark = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="18.5" stroke="#C9A36A" strokeWidth="0.8" />
    <circle cx="20" cy="20" r="14" stroke="#C9A36A" strokeWidth="0.4" opacity="0.5" />
    <path d="M12 10 L28 30" stroke="#C9A36A" strokeWidth="0.9" strokeLinecap="round" />
    <path d="M28 10 L12 30" stroke="#C9A36A" strokeWidth="0.9" strokeLinecap="round" />
    <circle cx="20" cy="20" r="2.4" fill="#0B0908" stroke="#C9A36A" strokeWidth="0.8" />
    <text x="20" y="8" textAnchor="middle" fontSize="3.2" fontFamily="Cormorant Garamond" fill="#C9A36A" letterSpacing="0.5">EST. MMXXV</text>
  </svg>
)

const Brand = ({ size = 'md' }: { size?: 'md' | 'lg' }) => (
  <Link href="/" className="brand">
    <BrandMark size={size === 'lg' ? 48 : 36} />
    <div>
      <div className="brand-name">ACICALADOS</div>
      <div className="mono" style={{ color: 'var(--mute)', fontSize: 9.5, letterSpacing: '0.28em', marginTop: 2 }}>BARBERÍA · SPA · VESTUARIO</div>
    </div>
  </Link>
)

export function Header({ cartCount = 0 }: { cartCount?: number }) {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && drawerOpen) setDrawerOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawerOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header className="site-header" role="banner">
        <div className="container">
          <nav className="nav" role="navigation" aria-label="Navegación principal">
            <Brand />
            <div className="nav-links">
              {NAV_ITEMS.map(item => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  aria-label={`Ir a ${item.label}`}
                >{item.label}</Link>
              ))}
            </div>
            <div className="nav-cta">
              <Link href="/productos" className="icon-btn" aria-label={`Carrito${cartCount > 0 ? `, ${cartCount} productos` : ''}`} data-tooltip="Carrito">
                <Icon.Cart size={16} />
                {cartCount > 0 && <span className="cart-count" aria-hidden="true">{cartCount}</span>}
              </Link>
              <Link href="/reservar" className="btn btn-gold" aria-label="Abrir formulario de reservas">Reservar</Link>
              <button className="icon-btn mobile-toggle" onClick={() => setDrawerOpen(true)} aria-label="Abrir menú de navegación" aria-expanded={drawerOpen}>
                <Icon.Menu size={18} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {drawerOpen && <div style={{ position: 'fixed', inset: 0, zIndex: 49, background: 'transparent' }} onClick={() => setDrawerOpen(false)} aria-hidden="true" />}
      <div className={`drawer ${drawerOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Menú de navegación">
        <div className="drawer-head">
          <Brand />
          <button className="icon-btn" onClick={() => setDrawerOpen(false)} aria-label="Cerrar menú">
            <Icon.X size={16} />
          </button>
        </div>
        <div className="drawer-links">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.id}
              href={item.href}
              className="drawer-link"
              onClick={() => setDrawerOpen(false)}
              aria-label={`Ir a ${item.label}`}
            >
              <span className="serif">{item.label}</span>
              <span className="i">0{i + 1}</span>
            </Link>
          ))}
        </div>
        <div className="drawer-cta">
          <Link href="/reservar" className="btn btn-gold" onClick={() => setDrawerOpen(false)}>Reservar Cita</Link>
          <Link href="/contacto" className="btn btn-ghost" onClick={() => setDrawerOpen(false)}>Contacto</Link>
        </div>
      </div>
    </>
  )
}

export function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Brand size="lg" />
            <p style={{ marginTop: 24, color: 'var(--cream-3)', fontSize: 14, lineHeight: 1.7, maxWidth: 360 }}>
              Un espacio para el hombre contemporáneo. Tradición de barbería, rituales de SPA y
              vestuario de ocasión bajo un mismo techo en San Isidro, Lima.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button className="icon-btn" aria-label="Instagram" data-tooltip="Instagram"><Icon.Instagram size={16} /></button>
              <button className="icon-btn" aria-label="WhatsApp" data-tooltip="WhatsApp"><Icon.Whatsapp size={16} /></button>
              <button className="icon-btn" aria-label="Correo electrónico" data-tooltip="Correo"><Icon.Mail size={16} /></button>
            </div>
          </div>
          <div className="footer-col">
            <h4>Explorar</h4>
            <ul>
              {NAV_ITEMS.slice(1).map(i => (
                <li key={i.id}><Link href={i.href}>{i.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Visítanos</h4>
            <ul style={{ color: 'var(--cream-3)', fontSize: 14 }}>
              <li>Av. Conquistadores 642</li>
              <li>San Isidro, Lima 15073</li>
              <li style={{ marginTop: 14 }}>Lun – Sáb · 10:00 a 21:00</li>
              <li>Dom · con cita previa</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contacto</h4>
            <ul>
              <li><a href="tel:+51987654321">+51 987 654 321</a></li>
              <li><a href="mailto:hola@acicalados.pe">hola@acicalados.pe</a></li>
              <li><a href="https://wa.me/51987654321" target="_blank" rel="noopener noreferrer">WhatsApp Reservas</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 ACICALADOS — Todos los derechos reservados</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a>Términos</a>
            <a>Privacidad</a>
            <a>Política de Reservas</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function SectionHead({ eyebrow, title, lead, align = 'left' }: {
  eyebrow?: string
  title: React.ReactNode
  lead?: string
  align?: 'left' | 'center'
}) {
  return (
    <div style={{ textAlign: align, maxWidth: align === 'center' ? 720 : 880, margin: align === 'center' ? '0 auto' : '0' }}>
      {eyebrow && <div className="eyebrow" style={{ marginBottom: 20 }}>— {eyebrow}</div>}
      <h2 className="serif" style={{
        fontSize: 'clamp(34px, 5vw, 64px)', lineHeight: 1.05, fontWeight: 500,
        color: 'var(--cream)', textWrap: 'balance' as never
      }}>{title}</h2>
      {lead && <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.65, color: 'var(--cream-3)', maxWidth: 640, ...(align === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } : {}) }}>{lead}</p>}
    </div>
  )
}

export { BrandMark, Brand }
