import { createClient } from '@supabase/supabase-js'

// 一時的にハードコード（テスト用）
const supabaseUrl = 'https://wgenqgftonilanprtjfl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS53ZWJzaXRlIiwicmVmIjoid2dlbnFnZmd0b25pbGFucHJ0amZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3NzUwNjcsImV4cCI6MjA3NjM1MTA2N30.nzB3kIb5j2NedouOhqI4uV6gOT3v7NyOnfH_c_po-_Q'

console.log('🔧 Supabase URL:', supabaseUrl)
console.log('🔧 Supabase Key:', supabaseAnonKey ? '設定済み' : '未設定')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)