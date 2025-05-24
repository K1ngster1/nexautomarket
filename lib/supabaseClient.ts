import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://...your-project-ref.supabase.co' // твій URL з Supabase
const supabaseAnonKey = 'public-anon-key' // твій public key з Supabase

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

