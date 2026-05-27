import {createClient} from '@supabase/supabase-js'

const supabaseUrl =
'https://woqiuilaopddnmobkrtv.supabase.co'

const supabaseKey =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvcWl1aWxhb3BkZG5tb2JrcnR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MDI5NzAsImV4cCI6MjA5NTQ3ODk3MH0.KdTNKKssJYuBeATzDLe_L0IZmibaGYj79cGqtzAep_Y'

export const supabase =
createClient(
supabaseUrl,
supabaseKey
)