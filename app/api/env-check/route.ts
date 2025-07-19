import { NextResponse } from "next/server"
import { getSupabaseConfig } from "@/lib/supabase"

export async function GET() {
  try {
    const config = getSupabaseConfig()

    return NextResponse.json({
      success: true,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        hasSupabaseUrl: config.hasUrl,
        hasSupabaseAnonKey: config.hasAnonKey,
        hasSupabaseServiceKey: config.hasServiceKey,
        isSupabaseConfigured: config.isConfigured,
      },
      message: config.isConfigured ? "Supabase is properly configured" : "Supabase environment variables are missing",
      missingVars: [
        ...(!config.hasUrl ? ["NEXT_PUBLIC_SUPABASE_URL"] : []),
        ...(!config.hasAnonKey ? ["NEXT_PUBLIC_SUPABASE_ANON_KEY"] : []),
        ...(!config.hasServiceKey ? ["SUPABASE_SERVICE_ROLE_KEY"] : []),
      ],
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
