import { describe, expect, it } from 'vitest';
import { User } from './User';

describe('User class', () => {
  it('should create a user instance with valid parameters', () => {
    const user = User.create(
      'user_id',
      'username',
      'John',
      'Doe',
      '123 Main St',
      'male',
      'john@example.com',
      'password123',
      'This is a bio',
      'profile_image.jpg',
      true,
    );

    expect(user).toBeInstanceOf(User);
    expect(user.getId()).toEqual('user_id');
    expect(user.getUsername()).toEqual('username');
    expect(user.getName()).toEqual('John');
    expect(user.getLastName()).toEqual('Doe');
    expect(user.getAddress()).toEqual('123 Main St');
    expect(user.getGender()).toEqual('male');
    expect(user.getBio()).toEqual('This is a bio');
    expect(user.getProfileImage()).toEqual('profile_image.jpg');
    expect(user.isActivated()).toBe(true);
    expect(user.hasId('user_id')).toBe(true);
    expect(user.hasUsername('username')).toBe(true);
    expect(user.hasName('John')).toBe(true);
    expect(user.hasLastName('Doe')).toBe(true);
    expect(user.hasAddress('123 Main St')).toBe(true);
    expect(user.hasGender('male')).toBe(true);
    expect(user.hasEmail('john@example.com')).toBe(true);
    expect(user.hasPassword('password123')).toBe(true);
    expect(user.hasBio('This is a bio')).toBe(true);
    expect(user.hasProfileImage('profile_image.jpg')).toBe(true);
    expect(user.isActivated()).toBe(true);
  });
});