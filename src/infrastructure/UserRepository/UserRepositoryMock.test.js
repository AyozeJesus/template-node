import UserRepositoryMock from './UserRepositoryMock.js'
import { describe, beforeEach, expect, it } from 'vitest'

describe('UserRepositoryMock', () => {
  let userRepositoryMock

  beforeEach(() => {
    userRepositoryMock = new UserRepositoryMock()
  })

  it('should create a new user', async () => {
    const newUser = await userRepositoryMock.createUser({
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      bio: 'A brief bio',
      profile_image: 'profile_image.jpg',
    })

    expect(newUser).toBeDefined()
    expect(newUser.username).toBe('john_doe')
    expect(newUser.email).toBe('john@example.com')
    expect(newUser.bio).toBe('A brief bio')
    expect(newUser.profile_image).toBe('profile_image.jpg')
  })

  it('should log in a user with valid credentials', async () => {
    userRepositoryMock.createUser({
      username: 'alice_smith',
      email: 'alice@example.com',
      password: 'secure123',
    })

    const { user, token } = await userRepositoryMock.login(
      'alice@example.com',
      'secure123',
    )

    expect(user).toBeDefined()
    expect(user.email).toBe('alice@example.com')
    expect(token).toBeDefined()
  })

  it('should throw an error when logging in with invalid credentials', async () => {
    await expect(
      userRepositoryMock.login('nonexistent@example.com', 'invalid_password'),
    ).rejects.toThrow('Invalid credentials')
  })
  it('should get a user by email', async () => {
    const userRepositoryMock = new UserRepositoryMock()

    const user = {
      username: 'alice_smith',
      email: 'alice@example.com',
      password: 'secure123',
      bio: 'A brief bio',
      profile_image: 'profile_image.jpg',
    }

    await userRepositoryMock.createUser(user)

    const retrievedUser = await userRepositoryMock.getUserByEmail(user.email)

    expect(retrievedUser).toEqual(user)
  })

  it('should throw an error when getting a user by email that does not exist', async () => {
    const userRepositoryMock = new UserRepositoryMock()

    await expect(
      userRepositoryMock.getUserByEmail('invalid@email.com'),
    ).rejects.toThrowError('User not found')
  })

  it('should get a user by id', async () => {
    const userRepositoryMock = new UserRepositoryMock()

    const user = {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      bio: 'A brief bio',
      profile_image: 'profile_image.jpg',
    }

    const createdUser = await userRepositoryMock.createUser(user)

    const retrievedUser = await userRepositoryMock.getUserById(createdUser.id)

    expect(retrievedUser).toEqual(createdUser)
  })

  it('should throw an error when getting a user by id that does not exist', async () => {
    const userRepositoryMock = new UserRepositoryMock()

    await expect(
      userRepositoryMock.getUserById('invalid-id'),
    ).rejects.toThrowError('User not found')
  })

  it('should update a user', async () => {
    const userRepositoryMock = new UserRepositoryMock()

    const user = {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      bio: 'A brief bio',
      profile_image: 'profile_image.jpg',
    }

    const createdUser = await userRepositoryMock.createUser(user)

    const updatedUser = {
      ...createdUser,
      name: 'Jane Doe',
    }

    await userRepositoryMock.updateUser(createdUser.id, updatedUser)

    const retrievedUser = await userRepositoryMock.getUserById(createdUser.id)

    expect(retrievedUser).toEqual(updatedUser)
  })

  it('should throw an error when updating a user that does not exist', async () => {
    const userRepositoryMock = new UserRepositoryMock()
    await expect(
      userRepositoryMock.updateUser('invalid-id', { name: 'Jane Doe' }),
    ).rejects.toThrowError('User not found')
  })

  it('Should delete a user', async () => {
    const userRepositoryMock = new UserRepositoryMock()
    const user = {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      bio: 'A brief bio',
      profile_image: 'profile_image.jpg',
    }
    const createdUser = await userRepositoryMock.createUser(user)
    await userRepositoryMock.deleteUser(createdUser.id)
    await expect(
      userRepositoryMock.getUserById(createdUser.id),
    ).rejects.toThrowError('User not found')
  })
  it('Should throw an error when deleting a user that does not exist', async () => {
    const userRepositoryMock = new UserRepositoryMock()
    await expect(
      userRepositoryMock.deleteUser('invalid-id'),
    ).rejects.toThrowError('User not found')
  })
})
