import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pkg from 'pg'; 
const { Pool } = pkg;
import { storage } from './storage';

// This script runs Drizzle migrations and seeds initial data
// It should be executed when the server starts

async function main() {
  console.log('Starting database migration...');
  
  try {
    // Create a new database connection
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    
    // Run migrations
    const db = drizzle(pool);
    console.log('Running migrations...');
    try {
      await migrate(db, { migrationsFolder: './migrations' });
      console.log('Migrations complete!');
    } catch (err: unknown) {
      // Define a type for PostgreSQL errors
      interface PostgresError {
        code: string;
      }
      
      // If the error is that tables already exist, we can continue
      if (typeof err === 'object' && err !== null && 'code' in err && (err as PostgresError).code === '42P07') {
        console.log('Tables already exist, skipping migrations');
      } else {
        // Otherwise rethrow the error
        throw err;
      }
    }
    
    // Seed initial data if needed
    console.log('Checking if data seeding is needed...');
    await storage.seedDataIfEmpty();
    
    console.log('Database setup complete!');
    
    // Close the connection
    await pool.end();
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

// Execute if this file is run directly from CLI
// In ESM, we can check if the file is being executed directly by checking import.meta.url
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
    .then(() => {
      console.log('Migration script completed successfully');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Migration script failed:', err);
      process.exit(1);
    });
}

export { main as runMigrations };