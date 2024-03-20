import { createPool } from 'mysql2/promise'
import { config } from '../Shared/config.js'

const { address, user, password, database } = config.mysql
let pool

export const getConnection = async () => {
  if (!pool) {
    pool = createPool({
      connectionLimit: 10,
      host: address,
      user: user,
      password: password,
      database: database,
      timezone: 'Z',
    })
  }

  return await pool.getConnection()
}
