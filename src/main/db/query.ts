import { Database } from 'better-sqlite3'
import BetterSQLite3 from 'better-sqlite3'
import { app } from 'electron'
import fs from 'fs'
import path from 'path'

interface DatabaseWrapper {
  findAll(sql: string, params?: any): Promise<any[]> | any[]
  findOne(sql: string, params?: any): Promise<any> | any
  insert(sql: string, params?: any): Promise<number> | number
  update(sql: string, params?: any): Promise<number> | number
  del(sql: string, params?: any): Promise<number> | number
  close(): Promise<void> | void
}

class SQLiteWrapper implements DatabaseWrapper {
  private db: Database

  constructor() {
    const dbPath = path.join(app.getPath('userData'), 'rapidle.db')
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, '')
    }
    this.db = new BetterSQLite3(dbPath)
  }

  findAll(sql: string, params: any = {}): any[] {
    return this.db.prepare(sql).all(params)
  }

  findOne(sql: string, params: any = {}): any {
    return this.db.prepare(sql).get(params)
  }

  insert(sql: string, params: any = {}): number {
    return this.db.prepare(sql).run(params).lastInsertRowid as number
  }

  update(sql: string, params: any = {}): number {
    return this.db.prepare(sql).run(params).changes
  }

  del(sql: string, params: any = {}): number {
    return this.db.prepare(sql).run(params).changes
  }

  close(): void {
    this.db.close()
  }
}

let dbWrapper: DatabaseWrapper

export const initDB = () => {
  dbWrapper = new SQLiteWrapper()
}

export const findAll = (sql: string, params?: any): Promise<any[]> | any[] => {
  return dbWrapper.findAll(sql, params)
}

export const findOne = (sql: string, params?: any): Promise<any> | any => {
  return dbWrapper.findOne(sql, params)
}

export const insert = (sql: string, params?: any): Promise<number> | number => {
  return dbWrapper.insert(sql, params)
}

export const update = (sql: string, params?: any): Promise<number> | number => {
  return dbWrapper.update(sql, params)
}

export const updateConfig = async (sql: string, params?: any): Promise<number> => {
  return dbWrapper.update(sql, params)
}

export const del = (sql: string, params?: any): Promise<number> | number => {
  return dbWrapper.del(sql, params)
}

export const config = async (): Promise<ConfigDataType> => {
  const result = await findOne('SELECT content FROM config WHERE id = 1')
  if (result && result.content) {
    try {
      return JSON.parse(result.content)
    } catch (error) {
      console.error('解析配置失败：', error)
      return getDefaultConfig()
    }
  }
  return getDefaultConfig()
}

function getDefaultConfig(): ConfigDataType {
  return {
    shortCut: 'Alt+Space',
    databaseDirectory: '/'
  }
}

export const closeDB = (): Promise<void> | void => {
  return dbWrapper.close()
}
