export const config = {
  mysql: {
    address: 'localhost',
    user: 'demo',
    password: process.env.DB_PASSWORD || 'password',
    database: 'template-node',
  },
}
