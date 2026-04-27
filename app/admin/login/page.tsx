'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { BrandMark } from '@/components/shell'
import { FieldInput } from '@/components/field-input'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError(authError.message)
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ink)', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 420, padding: 48, border: '1px solid var(--line-2)', background: 'var(--ink-2)' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}><BrandMark size={48} /></div>
        <h2 className="serif" style={{ fontSize: 28, textAlign: 'center', marginBottom: 8 }}>Panel Administrativo</h2>
        <p style={{ textAlign: 'center', color: 'var(--cream-3)', marginBottom: 32, fontSize: 14 }}>Ingresa con tu cuenta de administrador</p>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
          <FieldInput label="Correo" placeholder="admin@acicalados.pe" value={email} onChange={e => setEmail(e.target.value)} type="email" />
          <FieldInput label="Contraseña" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} type="password" />
          {error && <div style={{ padding: 12, background: 'rgba(184,74,60,0.1)', border: '1px solid var(--danger)', color: 'var(--danger)', fontSize: 12, fontFamily: 'var(--mono)' }}>{error}</div>}
          <button type="submit" className="btn btn-gold" style={{ width: '100%', marginTop: 8, opacity: loading ? 0.6 : 1 }} disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
