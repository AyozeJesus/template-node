import { UserRepository } from '../repository/UserRepository.js'
import { UserNotFoundError } from '../errors/UserNotFoundError.js'

class UserService {
  constructor() {
    this.userRepository = new UserRepository()
  }

  async createUser({
    username,
    name,
    lastname,
    address,
    gender,
    email,
    password,
    bio,
    profile_image,
  }) {
    return this.userRepository.createUser({
      username,
      name,
      lastname,
      address,
      gender,
      email,
      password,
      bio,
      profile_image,
    })
  }

  async login(email, password) {
    return this.userRepository.login(email, password)
  }

  async getUserByUserName(username) {
    return this.userRepository.getUserByUserName(username)
  }

  async userExists(userId) {
    const user = await this.getUserById(userId)
    return !!user
  }

  async getUserById(userId) {
    const user = await this.userRepository.getUserById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    return user
  }

  async getUserByEmail(email) {
    return this.userRepository.getUserByEmail(email)
  }

  async updateUser(userId, { username, bio, email, password, profile_image }) {
    return this.userRepository.updateUser(userId, {
      username,
      bio,
      email,
      password,
      profile_image,
    })
  }
  async getUserByToken(token) {
    return this.userRepository.getUserByToken(token)
  }
  async activateUser(userId) {
    return this.userRepository.activateUser(userId)
  }

  async createEmailVerification({ userId, token }) {
    return this.userRepository.createEmailVerification({ userId, token })
  }
}

export default UserService
