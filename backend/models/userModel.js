import pool from '../db.js';

// SQL user table creation (run once in psql)
/*
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'employee',
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/

export async function createUser({ email, password, role, name }) {
  const { rows } = await pool.query(
    'INSERT INTO users (email, password, role, name) VALUES ($1, $2, $3, $4) RETURNING *',
    [email, password, role, name]
  );
  return rows[0];
}

export async function findUserByEmail(email) {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE email=$1',
    [email]
  );
  return rows[0];
}

export async function findUserById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE id=$1',
    [id]
  );
  return rows[0];
}
