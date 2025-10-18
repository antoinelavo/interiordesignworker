import { supabase } from '../../lib/supabaseClient'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { data, error } = await supabase
      .from('quotes')
      .insert([req.body])
      .select()

    if (error) throw error

    return res.status(200).json({ success: true, data })
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ success: false, error: error.message })
  }
}