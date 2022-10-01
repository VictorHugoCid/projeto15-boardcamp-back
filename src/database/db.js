import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config()

const { Pool } = pkg;

// const connection = new Pool({
//   user: "postgres",
//   host: "localhost",
//   port: 5432,
//   database: "boardcamp",
//   password:"123456"
// })

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export { connection }


