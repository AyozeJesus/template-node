import { getConnection } from '../../infrastructure/Database/MySQLClient.js'
import bcrypt from 'bcrypt'
import { generateError } from '../../domain/utils/helpers.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import validator from 'validator'

export class UserRepository {
  async createUser({ username, bio, email, password, profile_image, }) {
    let connection
    try {
      connection = await getConnection()
      const [emailExist] = await connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
      )

      const [usernameExist] = await connection.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
      )

      if (!validator.isEmail(email)) {
        throw generateError('Please enter a valid email address.', 400)
      }

      if (emailExist.length > 0 || usernameExist.length > 0) {
        throw generateError(
          'Username or email already exists in our database. Please enter a different username or email.',
          409,
        )
      }

      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(password, saltRounds)

      const insertUserQuery =
        'INSERT INTO users (username, bio, email, password, profile_image,) VALUES (?, ?, ?, ?, ?)'
      const [insertResult] = await connection.query(insertUserQuery, [
        username,
        bio,
        email,
        hashedPassword,
        profile_image, ,
      ])

      const activationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      })

      return { userId: insertResult.insertId, activationToken }
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async createEmailVerification({ userId, token }) {
    let connection
    try {
      connection = await getConnection()

      const insertEmailVerificationQuery =
        'INSERT INTO email_verification (user_id, token) VALUES (?, ?)'
      await connection.query(insertEmailVerificationQuery, [userId, token])
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async login(email, password) {
    let connection
    let token

    try {
      connection = await getConnection()

      const [users] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [email],
      )

      if (users.length === 0) {
        throw generateError('Email or password is invalid.', 404)
      }

      const user = users[0]

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        throw generateError('Email or password is invalid.', 404)
      }
      token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: '24h',
        },
      )

      return token
    } catch (err) {
      console.log(err)
      throw generateError('Email or password incorrect', 404)
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async activateUser(userId) {
    let connection
    try {
      connection = await getConnection()

      await connection.execute(
        'UPDATE users SET isActivated = true WHERE id = ?',
        [userId],
      )
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }
  async getUserById(userId) {
    let connection
    try {
      connection = await getConnection()
      const [rows] = await connection.query(
        'SELECT * FROM users WHERE id = ?',
        [userId],
      )
      connection.release()
      return rows[0]
    } finally {
      if (connection) connection.release()
    }
  }

  async getUserByToken(token) {
    let connection
    try {
      connection = await getConnection()

      const [user] = await connection.execute(
        'SELECT * FROM users WHERE id IN (SELECT user_id FROM email_verification WHERE token = ?)',
        [token],
      )

      return user[0]
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async getUserByEmail(email) {
    let connection

    try {
      connection = await getConnection()

      const [result] = await connection.query(
        'SELECT *  FROM users WHERE email = ?',
        [email],
      )

      if (result.length === 0) {
        throw generateError('There is no user with that email address.', 404)
      }

      return result[0]
    } finally {
      if (connection) connection.release()
    }
  }
  async updateUser(userId, { username, bio, email, password, profile_image, }) {
    let connection

    try {
      connection = await getConnection()

      const updateFields = []
      const updateValues = []

      if (username) {
        updateFields.push('username = ?')
        updateValues.push(username)
      }

      if (bio) {
        updateFields.push('bio = ?')
        updateValues.push(bio)
      }

      if (email) {
        updateFields.push('email = ?')
        updateValues.push(email)
      }

      if (password) {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        updateFields.push('password = ?')
        updateValues.push(hashedPassword)
      }

      if (profile_image) {
        updateFields.push('profile_image, = ?')
        updateValues.push(profile_image,)
      }

      if (updateFields.length === 0) {
        return
      }

      const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`
      updateValues.push(userId)

      await connection.query(updateQuery, updateValues)
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }
}
