import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resultado del Pago — ACICALADOS',
  description: 'Estado de tu pago en ACICALADOS.',
}

export default function PagosResultadoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
