import { createClient } from '@supabase/supabase-js'

async function checkSchema() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Query the employees table to see what data structure exists
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .limit(1)

  if (error) {
    console.error('Error fetching employees:', error)
    return
  }

  console.log('Sample employee record:', JSON.stringify(data, null, 2))

  if (data && data.length > 0) {
    console.log('\nTable columns:', Object.keys(data[0]))
  }
}

checkSchema()
