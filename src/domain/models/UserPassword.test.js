import { describe, expect, it } from 'vitest'
import { UserPassword } from './UserPassword'
import { InvalidPasswordError } from '../errors/InvalidPasswordError'

describe('UserPassword class', () => {
  it('should create a UserPassword instance with a valid password', () => {
    const userPassword = UserPassword.fromPlain('password123')
    expect(userPassword).toBeInstanceOf(UserPassword)
  })

  it('should throw an InvalidPasswordError if the password is too short', () => {
    expect(() => UserPassword.fromPlain('short')).toThrow(InvalidPasswordError)
  })

  it('should compare a valid password correctly', () => {
    const userPassword = UserPassword.fromPlain('password123')
    expect(userPassword.compareWith('password123')).toBe(true)
  })

  it('should return false when comparing an incorrect password', () => {
    const userPassword = UserPassword.fromPlain('password123')
    expect(userPassword.compareWith('wrongpassword')).toBe(false)
  })
})
