import type { Metadata } from 'next'
import { getServices } from '@/lib/queries'
import { ServicePageContent } from './_components/service-content'

export const metadata: Metadata = {
  title: 'Barbería — ACICALADOS',
  description: 'Cortes clásicos, fade contemporáneo, afeitado al ras con toalla caliente y un ritual que respeta cada detalle.',
}

export default async function BarberiaPage() {
  const services = await getServices()
  const svc = services.find(s => s.id === 'barberia')!
  return <ServicePageContent service={svc} />
}
