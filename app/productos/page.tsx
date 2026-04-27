import type { Metadata } from 'next'
import { getProducts } from '@/lib/queries'
import { ShopContent } from './_components/shop-content'

export const metadata: Metadata = {
  title: 'Productos — ACICALADOS',
  description: 'Selección curada: aceites, bálsamos, herramientas y kits. Los mismos productos que usamos en nuestros rituales.',
}

export default async function ProductosPage() {
  const products = await getProducts()
  return <ShopContent products={products} />
}
