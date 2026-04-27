import type { Metadata } from 'next'
import { ScrollProgress } from '@/components/scroll-progress'
import { LayoutShell } from '@/components/layout-shell'
import './globals.css'

export const metadata: Metadata = {
  title: 'ACICALADOS — Barbería, SPA & Vestuario',
  description: 'Un espacio para el hombre contemporáneo. Tradición de barbería, rituales de SPA y vestuario de ocasión bajo un mismo techo en San Isidro, Lima.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div id="app">
          <ScrollProgress />
          <LayoutShell>{children}</LayoutShell>
        </div>
      </body>
    </html>
  )
}
