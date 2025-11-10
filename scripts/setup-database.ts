import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

async function setupDatabase() {
  // Load environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase credentials in .env.local')
    console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }

  console.log('🔗 Connecting to Supabase...')
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    // Read schema file
    console.log('📖 Reading schema.sql...')
    const schemaPath = join(process.cwd(), 'supabase', 'schema.sql')
    const schema = readFileSync(schemaPath, 'utf-8')

    // Execute schema
    console.log('🏗️  Creating tables...')
    const { error: schemaError } = await supabase.rpc('exec_sql', { sql: schema })

    if (schemaError) {
      // Try alternative: execute via REST API (requires service role key)
      console.log('⚠️  RPC method not available, using direct execution...')

      // Split by statement and execute each
      const statements = schema
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'))

      for (const statement of statements) {
        if (statement.includes('CREATE TABLE') || statement.includes('CREATE INDEX')) {
          console.log(`  Executing: ${statement.substring(0, 50)}...`)
        }
      }

      console.log('⚠️  Cannot execute raw SQL via Supabase JS client.')
      console.log('📋 Please run the SQL files manually in Supabase Dashboard:')
      console.log('   1. Go to: https://supabase.com/dashboard')
      console.log('   2. Navigate to SQL Editor')
      console.log('   3. Copy contents of supabase/schema.sql')
      console.log('   4. Paste and Run')
      console.log('   5. Copy contents of supabase/seed.sql')
      console.log('   6. Paste and Run')
      process.exit(1)
    }

    // Read seed file
    console.log('📖 Reading seed.sql...')
    const seedPath = join(process.cwd(), 'supabase', 'seed.sql')
    const seed = readFileSync(seedPath, 'utf-8')

    // Execute seed
    console.log('🌱 Seeding data...')
    const { error: seedError } = await supabase.rpc('exec_sql', { sql: seed })

    if (seedError) {
      console.error('❌ Error seeding data:', seedError.message)
      process.exit(1)
    }

    // Verify setup
    console.log('✅ Verifying setup...')
    const { count, error: countError } = await supabase
      .from('employees')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      console.error('❌ Error verifying employees table:', countError.message)
      process.exit(1)
    }

    console.log(`✅ Database setup complete!`)
    console.log(`✅ Found ${count} employees`)
    console.log(`🚀 Run 'npm run dev' and visit http://localhost:3000`)
  } catch (error) {
    console.error('❌ Unexpected error:', error)
    process.exit(1)
  }
}

setupDatabase()
