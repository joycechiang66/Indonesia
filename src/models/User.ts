import db from '../database/db';

export interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  created_at?: string;
}

export class UserModel {
  // 獲取所有用戶
  static getAll(): User[] {
    return db.prepare('SELECT * FROM users').all();
  }

  // 通過手機號碼查找用戶
  static findByPhone(phone: string): User | undefined {
    return db.prepare('SELECT * FROM users WHERE phone = ?').get(phone);
  }

  // 通過郵箱查找用戶
  static findByEmail(email: string): User | undefined {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  }

  // 創建新用戶
  static create(user: Omit<User, 'id' | 'created_at'>): User {
    const stmt = db.prepare(`
      INSERT INTO users (name, email, phone)
      VALUES (?, ?, ?)
      RETURNING *
    `);
    return stmt.get(user.name, user.email, user.phone);
  }
}

export default UserModel; 