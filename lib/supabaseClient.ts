import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kizoynsruttrsssuaina.supabase.co' // твій URL з Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtpem95bnNydXR0cnNzc3VhaW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NDcxMDIsImV4cCI6MjA2MzQyMzEwMn0.l3Dy2a9Uk9WngEPXOf4ize6GiSxaoWjw6y9VRQ80FoE' // твій public key з Supabase

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

