import type { Metadata } from 'next'
import { getFaqs } from '@/lib/queries'
import { ContactContent } from './_components/contact-content'

export const metadata: Metadata = {
  title: 'Contacto — ACICALADOS',
  description: 'Estamos en San Isidro, Lima. Atendemos de lunes a sábado. Para consultas rápidas, WhatsApp es la vía más veloz.',
}

export default async function ContactoPage() {
  const faqs = await getFaqs()
  return <ContactContent faqs={faqs} />
}
