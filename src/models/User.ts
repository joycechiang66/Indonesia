import Database from 'better-sqlite3';

export interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
}

const db = new Database('users.db');

export const getAllUsers = (): User[] => {
  const result = db.prepare('SELECT * FROM users').all();
  return result as User[];
};

export const getUserByPhone = (phone: string): User | undefined => {
  const result = db.prepare('SELECT * FROM users WHERE phone = ?').get(phone);
  return result as User | undefined;
};

export const getUserByEmail = (email: string): User | undefined => {
  const result = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  return result as User | undefined;
};

export const createUser = (user: User): User => {
  const stmt = db.prepare(
    'INSERT INTO users (name, email, phone) VALUES (?, ?, ?) RETURNING *'
  );
  const result = stmt.get(user.name, user.email, user.phone);
  return result as User;
};

export default { getAllUsers, getUserByPhone, getUserByEmail, createUser }; 