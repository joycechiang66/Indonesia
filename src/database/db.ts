import Database from 'better-sqlite3';
import path from 'path';

// 創建資料庫連接
const db = new Database(path.join(process.cwd(), 'makkahgo.db'), { verbose: console.log });

// 創建用戶表
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// 插入示例用戶數據
const insertUser = db.prepare(`
  INSERT OR IGNORE INTO users (name, email, phone)
  VALUES (?, ?, ?)
`);

// 插入一個示例用戶
insertUser.run('John Doe', 'john.doe@example.com', '81234567890');

export default db; 