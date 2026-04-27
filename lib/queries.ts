// Funciones de lectura de datos desde Supabase — para Server Components
import { createClient } from '@/utils/supabase/server'
import type { Service, Product, VestuarioItem, Testimonial, FAQ, GalleryItem, BlogPost } from '@/types'
import {
  SERVICES as FALLBACK_SERVICES,
  PRODUCTS as FALLBACK_PRODUCTS,
  VESTUARIO_ITEMS as FALLBACK_VESTUARIO,
  TESTIMONIALS as FALLBACK_TESTIMONIALS,
  FAQS as FALLBACK_FAQS,
  GALLERY_ITEMS as FALLBACK_GALLERY,
  BLOG_POSTS as FALLBACK_BLOG,
} from '@/lib/data'

export async function getServices(): Promise<Service[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('services')
      .select('*, service_items(*)')
      .order('sort_order')
    if (error || !data) return FALLBACK_SERVICES
    return data.map(s => ({
      id: s.id,
      rubro: s.rubro,
      name: s.name,
      tagline: s.tagline,
      accent: s.accent,
      description: s.description,
      items: (s.service_items || [])
        .sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)
        .map((i: { id: string; name: string; duration: string; price: number | null; description: string }) => ({
          id: i.id,
          name: i.name,
          duration: i.duration,
          price: i.price ? Number(i.price) : null,
          desc: i.description,
        })),
    }))
  } catch {
    return FALLBACK_SERVICES
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('sort_order')
    if (error || !data) return FALLBACK_PRODUCTS
    return data.map(p => ({
      id: p.id,
      cat: p.category,
      name: p.name,
      price: Number(p.price),
      stock: p.stock,
      desc: p.description,
      image: p.image_url,
    }))
  } catch {
    return FALLBACK_PRODUCTS
  }
}

export async function getVestuarioItems(): Promise<VestuarioItem[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('vestuario_items')
      .select('*')
      .order('sort_order')
    if (error || !data) return FALLBACK_VESTUARIO
    return data.map(v => ({
      id: v.id,
      name: v.name,
      category: v.category,
      status: v.status,
      desc: v.description,
      image: v.image_url,
      deposit: Number(v.deposit_amount),
    }))
  } catch {
    return FALLBACK_VESTUARIO
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('sort_order')
    if (error || !data) return FALLBACK_TESTIMONIALS
    return data.map(t => ({
      name: t.name,
      role: t.role,
      quote: t.quote,
    }))
  } catch {
    return FALLBACK_TESTIMONIALS
  }
}

export async function getFaqs(): Promise<FAQ[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('sort_order')
    if (error || !data) return FALLBACK_FAQS
    return data.map(f => ({
      q: f.question,
      a: f.answer,
    }))
  } catch {
    return FALLBACK_FAQS
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('sort_order')
    if (error || !data) return FALLBACK_GALLERY
    return data.map(g => ({
      id: g.id,
      span: g.span,
      label: g.label,
      image: g.image_url,
    }))
  } catch {
    return FALLBACK_GALLERY
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false })
    if (error || !data) return FALLBACK_BLOG
    return data.map(b => ({
      id: b.id,
      cat: b.category,
      title: b.title,
      excerpt: b.excerpt,
      date: new Date(b.published_at).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }),
      read: b.read_time,
    }))
  } catch {
    return FALLBACK_BLOG
  }
}
