import { supabase } from '../../../lib/supabaseClient'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { contact, password } = req.body

  try {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('contact', contact)
      .eq('password', password)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error || !data) {
      return res.status(401).json({ success: false, message: '연락처 또는 비밀번호가 일치하지 않습니다' })
    }

    return res.status(200).json({ success: true, data })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}