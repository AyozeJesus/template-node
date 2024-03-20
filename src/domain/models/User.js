import { UserEmail } from './UserEmail.js';
import { UserPassword } from './UserPassword.js';

export class User {
  static create(
    id,
    username,
    name,
    lastname,
    address,
    gender,
    email,
    password,
    bio,
    profile_image,
    activated,
  ) {
    return new User(
      id,
      username,
      name,
      lastname,
      address,
      gender,
      email,
      UserPassword.fromPlain(password),
      bio,
      profile_image,
      activated,
    );
  }

  constructor(
    id,
    username,
    name,
    lastname,
    address,
    gender,
    email,
    password,
    bio,
    profile_image,
    activated = false,
  ) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.lastname = lastname;
    this.address = address;
    this.gender = gender;
    this.bio = bio;
    this.email = new UserEmail(email);
    this.password = password;
    this.profile_image = profile_image;
    this.activated = activated;
  }

  isActivated() {
    return this.activated;
  }

  activate() {
    this.activated = true;
  }

  getId() {
    return this.id;
  }

  getUsername() {
    return this.username;
  }

  getName() {
    return this.name;
  }

  getLastName() {
    return this.lastname;
  }

  getAddress() {
    return this.address;
  }

  getGender() {
    return this.gender;
  }

  getBio() {
    return this.bio;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  getProfileImage() {
    return this.profile_image;
  }

  hasId(id) {
    return this.id === id;
  }

  hasUsername(username) {
    return this.username === username;
  }

  hasName(name) {
    return this.name === name;
  }

  hasLastName(lastname) {
    return this.lastname === lastname;
  }

  hasAddress(address) {
    return this.address === address;
  }

  hasGender(gender) {
    return this.gender === gender;
  }

  hasBio(bio) {
    return this.bio === bio;
  }

  hasEmail(email) {
    return this.email.equals(new UserEmail(email));
  }

  hasPassword(plainPassword) {
    return this.password.compareWith(plainPassword);
  }

  hasProfileImage(profile_image) {
    return this.profile_image === profile_image;
  }

  update({ username, name, lastname, address, gender, bio, email, password, profile_image }) {
    if (username !== undefined) {
      this.username = username;
    }

    if (name !== undefined) {
      this.name = name;
    }

    if (lastname !== undefined) {
      this.lastname = lastname;
    }

    if (address !== undefined) {
      this.address = address;
    }

    if (gender !== undefined) {
      this.gender = gender;
    }

    if (bio !== undefined) {
      this.bio = bio;
    }

    if (email !== undefined) {
      this.email = new UserEmail(email);
    }

    if (password !== undefined) {
      this.password = UserPassword.fromPlain(password);
    }

    if (profile_image !== undefined) {
      this.profile_image = profile_image;
    }
  }
}