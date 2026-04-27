import type { Metadata } from 'next'
import { getServices } from '@/lib/queries'
import { ServicePageContent } from '../barberia/_components/service-content'

export const metadata: Metadata = {
  title: 'SPA para Caballeros — ACICALADOS',
  description: 'Tratamientos faciales, masajes descontracturantes y rituales de cuidado pensados para el hombre contemporáneo.',
}

export default async function SpaPage() {
  const services = await getServices()
  const svc = services.find(s => s.id === 'spa')!
  return <ServicePageContent service={svc} />
}
