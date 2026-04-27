// Tipos centrales de ACICALADOS

export interface ServiceItem {
  id: string
  name: string
  duration: string
  price: number | null
  desc: string
}

export interface Service {
  id: string
  rubro: string
  name: string
  tagline: string
  accent: string
  description: string
  items: ServiceItem[]
}

export interface Product {
  id: string
  cat: string
  name: string
  price: number
  stock: number
  desc: string
  image?: string
}

export interface VestuarioItem {
  id: string
  name: string
  category: string
  status: string
  desc: string
  image?: string
  deposit: number
}

export interface Testimonial {
  name: string
  role: string
  quote: string
}

export interface FAQ {
  q: string
  a: string
}

export interface BlogPost {
  id: number
  cat: string
  title: string
  excerpt: string
  date: string
  read: string
}

export interface GalleryItem {
  id: number
  span: string
  label: string
  image?: string
}

export interface CartItem extends Product {
  qty: number
}

export interface BookingCartItem extends ServiceItem {
  rubro: string
}
