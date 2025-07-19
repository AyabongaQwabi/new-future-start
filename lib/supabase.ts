import { createClient } from "@supabase/supabase-js"

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Create clients with proper error handling
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export const supabaseAdmin =
  supabaseUrl && supabaseServiceRoleKey ? createClient(supabaseUrl, supabaseServiceRoleKey) : supabase

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && supabase)
}

// Helper function to get configuration status
export const getSupabaseConfig = () => ({
  hasUrl: !!supabaseUrl,
  hasAnonKey: !!supabaseAnonKey,
  hasServiceKey: !!supabaseServiceRoleKey,
  isConfigured: isSupabaseConfigured(),
})

// Safe database operation wrapper
export const safeSupabaseOperation = async (operation: () => Promise<any>) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Database connection not available. Please check your environment variables.")
  }

  try {
    return await operation()
  } catch (error) {
    console.error("Supabase operation failed:", error)
    throw error
  }
}
