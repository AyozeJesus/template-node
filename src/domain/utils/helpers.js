import fs from 'fs/promises'
export const generateError = (message, status) => {
  const error = new Error(message)
  error.httpStatus = status
  return error
}

export const createPathIfNotExists = async (path) => {
  try {
    await fs.access(path)
  } catch {
    await fs.mkdir(path)
  }
}
