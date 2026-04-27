import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { AdminDashboard } from './_components/admin-dashboard'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return <AdminDashboard userEmail={user.email || ''} />
}
