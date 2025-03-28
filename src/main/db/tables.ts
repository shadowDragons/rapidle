import { insert, findOne } from './query'

export async function initTable() {
  const createTableQueries = [
    `
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS contents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category_id INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      type tinyint NOT NULL DEFAULT 1
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS config (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS quick_view (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      url TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      abbr varchar(100) DEFAULT NULL
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS tools (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      url TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      abbr varchar(100) DEFAULT NULL
    )
    `
  ]
  for (const query of createTableQueries) {
    try {
      await insert(query)
    } catch (error) {
      console.error('创建数据表失败：', error)
    }
  }

  // 检查config表是否有数据，如果没有则创建一条id=1的默认记录
  try {
    const configExists = await findOne('SELECT id FROM config WHERE id = 1')
    if (!configExists) {
      const defaultConfig = {
        shortCut: 'Alt+Space',
        databaseDirectory: '/'
      }
      await insert('INSERT INTO config (id, content) VALUES (1, ?)', [
        JSON.stringify(defaultConfig)
      ])
      console.log('已创建默认配置')
    }
  } catch (error) {
    console.error('检查或创建默认配置失败：', error)
  }
}
