'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { BrandMark } from '@/components/shell'

const ADMIN_SECTIONS = [
  { id: 'services', label: 'Servicios', icon: '✂' },
  { id: 'products', label: 'Productos', icon: '🧴' },
  { id: 'vestuario', label: 'Vestuario', icon: '👔' },
  { id: 'bookings', label: 'Reservas', icon: '📅' },
  { id: 'orders', label: 'Pedidos', icon: '📦' },
  { id: 'messages', label: 'Mensajes', icon: '✉' },
]

function EditableCell({ value, field, onSave, type = 'text' }: {
  value: string | number | null
  field: string
  onSave: (field: string, value: string | number) => void
  type?: string
}) {
  const [editing, setEditing] = useState(false)
  const [val, setVal] = useState(String(value ?? ''))
  const save = () => { onSave(field, type === 'number' ? Number(val) : val); setEditing(false) }

  if (!editing) return (
    <span onClick={() => { setEditing(true); setVal(String(value ?? '')) }} style={{ cursor: 'pointer', borderBottom: '1px dashed var(--line-2)', padding: '2px 4px' }} title="Clic para editar">
      {value ?? '—'}
    </span>
  )
  return (
    <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
      <input type={type} value={val} onChange={e => setVal(e.target.value)} autoFocus onKeyDown={e => e.key === 'Enter' && save()}
        style={{ padding: '4px 8px', background: 'var(--ink)', border: '1px solid var(--gold)', color: 'var(--cream)', fontSize: 13, width: type === 'number' ? 80 : 160 }} />
      <button onClick={save} style={{ padding: '4px 8px', background: 'var(--gold)', color: 'var(--ink)', border: 'none', fontSize: 11, cursor: 'pointer' }}>✓</button>
      <button onClick={() => setEditing(false)} style={{ padding: '4px 8px', border: '1px solid var(--line-2)', color: 'var(--cream)', fontSize: 11, cursor: 'pointer', background: 'transparent' }}>✕</button>
    </span>
  )
}

function AdminServices() {
  const [services, setServices] = useState<any[]>([])
  const [msg, setMsg] = useState<string | null>(null)
  const supabase = createClient()
  const load = useCallback(async () => {
    const { data } = await supabase.from('services').select('*, service_items(*)').order('sort_order')
    if (data) setServices(data)
  }, [])
  useEffect(() => { load() }, [load])

  const handleUpdate = async (itemId: string, field: string, value: string | number) => {
    setMsg(null)
    const { error } = await supabase.from('service_items').update({ [field]: value }).eq('id', itemId)
    if (error) setMsg('Error: ' + error.message); else { setMsg('✅ Actualizado'); load() }
    setTimeout(() => setMsg(null), 2000)
  }
  return (
    <div>
      <h3 className="serif" style={{ fontSize: 24, marginBottom: 20 }}>Servicios y Precios</h3>
      {msg && <div style={{ padding: 10, marginBottom: 12, background: msg.startsWith('✅') ? 'rgba(76,175,80,0.1)' : 'rgba(184,74,60,0.1)', border: '1px solid', borderColor: msg.startsWith('✅') ? 'var(--ok)' : 'var(--danger)', fontSize: 12, fontFamily: 'var(--mono)', color: msg.startsWith('✅') ? 'var(--ok)' : 'var(--danger)' }}>{msg}</div>}
      {services.map(s => (
        <div key={s.id} style={{ marginBottom: 32 }}>
          <div className="mono" style={{ color: 'var(--gold)', marginBottom: 12, fontSize: 11 }}>{s.rubro}</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead><tr style={{ borderBottom: '1px solid var(--line)', textAlign: 'left' }}>
              <th style={{ padding: '8px 12px', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--mute)' }}>SERVICIO</th>
              <th style={{ padding: '8px 12px', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--mute)' }}>DURACIÓN</th>
              <th style={{ padding: '8px 12px', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--mute)' }}>PRECIO (S/)</th>
              <th style={{ padding: '8px 12px', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--mute)' }}>DESCRIPCIÓN</th>
            </tr></thead>
            <tbody>
              {(s.service_items || []).sort((a: any, b: any) => a.sort_order - b.sort_order).map((item: any) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '10px 12px' }}><EditableCell value={item.name} field="name" onSave={(f, v) => handleUpdate(item.id, f, v)} /></td>
                  <td style={{ padding: '10px 12px' }}><EditableCell value={item.duration} field="duration" onSave={(f, v) => handleUpdate(item.id, f, v)} /></td>
                  <td style={{ padding: '10px 12px' }}><EditableCell value={item.price} field="price" type="number" onSave={(f, v) => handleUpdate(item.id, f, v)} /></td>
                  <td style={{ padding: '10px 12px', maxWidth: 240 }}><EditableCell value={item.description} field="description" onSave={(f, v) => handleUpdate(item.id, f, v)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([])
  const [msg, setMsg] = useState<string | null>(null)
  const supabase = createClient()
  const load = useCallback(async () => { const { data } = await supabase.from('bookings').select('*').order('created_at', { ascending: false }); if (data) setBookings(data) }, [])
  useEffect(() => { load() }, [load])
  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('bookings').update({ status }).eq('id', id)
    if (!error) { setMsg('✅ Estado actualizado'); load() }
    setTimeout(() => setMsg(null), 2000)
  }
  const statusBadge = (s: string) => {
    const colors: Record<string, string> = { pendiente: 'var(--gold)', confirmada: 'var(--ok)', completada: 'var(--mute)', cancelada: 'var(--danger)' }
    return <span className="mono" style={{ fontSize: 10, padding: '4px 8px', border: '1px solid', borderColor: colors[s] || 'var(--mute)', color: colors[s] || 'var(--mute)' }}>{s.toUpperCase()}</span>
  }
  return (
    <div>
      <h3 className="serif" style={{ fontSize: 24, marginBottom: 20 }}>Reservas ({bookings.length})</h3>
      {msg && <div style={{ padding: 10, marginBottom: 12, background: 'rgba(76,175,80,0.1)', border: '1px solid var(--ok)', fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--ok)' }}>{msg}</div>}
      {bookings.length === 0 ? <p style={{ color: 'var(--mute)' }}>No hay reservas aún.</p> :
        <div style={{ display: 'grid', gap: 12 }}>
          {bookings.map((b: any) => (
            <div key={b.id} style={{ padding: 20, border: '1px solid var(--line)', background: 'var(--ink)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span className="mono" style={{ color: 'var(--gold)' }}>{b.booking_code}</span>
                {statusBadge(b.status)}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, fontSize: 13 }}>
                <div><span className="mono" style={{ color: 'var(--mute)', fontSize: 10 }}>CLIENTE</span><div style={{ marginTop: 4 }}>{b.customer_name}</div></div>
                <div><span className="mono" style={{ color: 'var(--mute)', fontSize: 10 }}>FECHA</span><div style={{ marginTop: 4 }}>{b.booking_date || '—'} {b.booking_time || ''}</div></div>
                <div><span className="mono" style={{ color: 'var(--mute)', fontSize: 10 }}>TIPO</span><div style={{ marginTop: 4 }}>{b.booking_type}</div></div>
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                {['pendiente', 'confirmada', 'completada', 'cancelada'].map(s => (
                  <button key={s} onClick={() => updateStatus(b.id, s)} disabled={b.status === s} className="mono"
                    style={{ padding: '4px 10px', fontSize: 10, border: '1px solid var(--line-2)', color: b.status === s ? 'var(--gold)' : 'var(--cream-3)', background: b.status === s ? 'rgba(201,163,106,0.1)' : 'transparent', cursor: b.status === s ? 'default' : 'pointer' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

function AdminPlaceholder({ title }: { title: string }) {
  return (
    <div>
      <h3 className="serif" style={{ fontSize: 24, marginBottom: 20 }}>{title}</h3>
      <p style={{ color: 'var(--mute)' }}>Sección en desarrollo.</p>
    </div>
  )
}

export function AdminDashboard({ userEmail }: { userEmail: string }) {
  const [section, setSection] = useState('services')
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '240px 1fr', background: 'var(--ink)' }}>
      <aside style={{ borderRight: '1px solid var(--line)', padding: '24px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0 24px', marginBottom: 32 }}>
          <BrandMark size={32} />
          <div className="mono" style={{ color: 'var(--gold)', marginTop: 8, fontSize: 10 }}>PANEL ADMIN</div>
        </div>
        <nav style={{ flex: 1 }}>
          {ADMIN_SECTIONS.map(s => (
            <button key={s.id} onClick={() => setSection(s.id)} style={{
              width: '100%', padding: '14px 24px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12,
              background: section === s.id ? 'rgba(201,163,106,0.08)' : 'transparent',
              borderLeft: section === s.id ? '2px solid var(--gold)' : '2px solid transparent',
              color: section === s.id ? 'var(--gold)' : 'var(--cream-3)', fontSize: 14,
              borderBottom: '1px solid var(--line)',
            }}>
              <span>{s.icon}</span> {s.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '20px 24px', borderTop: '1px solid var(--line)' }}>
          <div style={{ fontSize: 12, color: 'var(--cream-3)', marginBottom: 8 }}>{userEmail}</div>
          <button onClick={handleLogout} className="mono" style={{ color: 'var(--danger)', fontSize: 11 }}>Cerrar sesión</button>
        </div>
      </aside>

      <main style={{ padding: 40, overflowY: 'auto', maxHeight: '100vh' }}>
        <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="serif" style={{ fontSize: 32 }}>
            {ADMIN_SECTIONS.find(s => s.id === section)?.icon} {ADMIN_SECTIONS.find(s => s.id === section)?.label}
          </h2>
          <Link href="/" style={{ color: 'var(--gold)', fontSize: 13, fontFamily: 'var(--mono)', textDecoration: 'none' }}>← Volver al sitio</Link>
        </div>
        {section === 'services' && <AdminServices />}
        {section === 'bookings' && <AdminBookings />}
        {section === 'products' && <AdminPlaceholder title="Productos" />}
        {section === 'vestuario' && <AdminPlaceholder title="Vestuario" />}
        {section === 'orders' && <AdminPlaceholder title="Pedidos" />}
        {section === 'messages' && <AdminPlaceholder title="Mensajes" />}
      </main>
    </div>
  )
}
