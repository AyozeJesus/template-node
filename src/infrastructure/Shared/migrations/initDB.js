import dotenv from 'dotenv'
dotenv.config()
import { getConnection } from '../../UserRepository/MySQLClient.js'
import bcrypt from 'bcrypt'
import chalk from 'chalk'

async function main() {
  let connection
  try {
    connection = await getConnection()
    console.log(chalk.green('Connected'))
    console.log(chalk.yellow('Dropping existing tables'))
    await dropTableIfExists(connection, 'emails')
    await dropTableIfExists(connection, 'users')

    console.log(chalk.yellow('Creating tables'))
    await createEmailsTable(connection)
    await createUsersTable(connection)
  } catch (error) {
    console.error(error)
  } finally {
    if (connection) connection.release()
    process.exit()
  }
}

async function dropTableIfExists(connection, tableName) {
  await connection.query(`SET FOREIGN_KEY_CHECKS = 0`)
  await connection.query(`DROP TABLE IF EXISTS ${tableName}`)
  console.log(chalk.green(`Table ${tableName} dropped if exists.`))
}

async function createEmailsTable(connection) {
  await connection.query(`CREATE TABLE IF NOT EXISTS email_verification (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      token VARCHAR(255),
      FOREIGN KEY (user_id) REFERENCES users(id)
  );
  `)
  console.log(chalk.green('Table emails created'))
}

async function createUsersTable(connection) {
  await connection.query(`CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(50) NOT NULL UNIQUE,
      name VARCHAR(50),
      lastname varchar(50),
      address text,
      gender varchar(10),
      email VARCHAR(90) NOT NULL UNIQUE,
      password VARCHAR(90) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      profile_image VARCHAR(255),
      bio varchar(255),
      isActivated BOOLEAN NOT NULL DEFAULT false
  )`)

  const usersToInsert = [
    {
      username: 'CyberGamer92',
      name: 'John',
      lastname: 'Doe',
      address: '123 Cyber Avenue, Cyber City',
      gender: 'male',
      email: 'user1@example.com',
      password: 'password1',
      bio: 'Gamer since the 90s. I love playing all kinds of games, from retro classics to the latest AAA titles. Let’s team up and have some fun!',
      isActivated: true,
    },
    {
      username: 'TechGirl',
      name: 'Jane',
      lastname: 'Smith',
      address: '456 Tech Street Tech Town',
      gender: 'female',
      email: 'user2@example.com',
      password: 'password2',
      bio: 'Tech enthusiast and software developer. I love coding and learning new things. Let’s connect and share our knowledge!',
      isActivated: true,
    },
    {
      username: 'MusicLover',
      name: 'Alice',
      lastname: 'Wonderland',
      address: '789 Music Road, Music City ',
      gender: 'female',
      email: 'user3@example.com',
      password: 'password3',
      bio: 'Music lover and aspiring musician. I play the guitar and sing. Let’s jam together and make some music!',
      isActivated: true,
    },
  ]

  for (const user of usersToInsert) {
    const saltRounds = 10
    user.password = await bcrypt.hash(user.password, saltRounds)
    await connection.query(`INSERT INTO users SET ?`, user)
  }

  console.log(chalk.green('Table users created and populated with some users.'))
}

main()
