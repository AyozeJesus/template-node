import { UserRepository } from '../../domain/repository/UserRepository.js'

class UserRepositoryMock extends UserRepository {
  constructor() {
    super()
    this.users = []
  }

  async createUser(user) {
    this.users.push(user)

    return user
  }

  async login(email, password) {
    const user = this.users.find(
      (user) => user.email === email && user.password === password,
    )

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const token = 'mocked-jwt-token'

    return { user, token }
  }

  async getUserByEmail(email) {
    const user = this.users.find((u) => u.email === email)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }

  async getUserById(userId) {
    const user = this.users.find((u) => u.id === userId)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }

  async updateUser(id, user) {
    const userIndex = this.users.findIndex((user) => user.id === id)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...user,
    }

    return this.users[userIndex]
  }

  async deleteUser(id) {
    const userIndex = this.users.findIndex((user) => user.id === id)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    this.users.splice(userIndex, 1)
  }
}
export default UserRepositoryMock
