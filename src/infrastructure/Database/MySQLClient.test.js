import { describe, expect, it, vi } from 'vitest'
import * as db from './MySQLClient'
vi.mock('mysql2/promise', () => {
  return {
    createPool: () => {
      return {
        getConnection: async () => {
          return {
            release: vi.fn(),
          }
        },
      }
    },
  }
})

vi.mock('dotenv', () => {
  return {
    config: () => {
      process.env.DB_HOST = 'testhost'
      process.env.DB_USER = 'testuser'
      process.env.DB_PASSWORD = 'testpassword'
      process.env.DB_DATABASE = 'testdb'
    },
  }
})

describe('Database', () => {
  it('should get a connection', async () => {
    const connection = await db.getConnection()

    expect(connection).toBeDefined()
  })
})
