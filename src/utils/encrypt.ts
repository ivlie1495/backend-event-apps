import crypto from 'crypto'

const SECRET = process.env.SECRET || ''

export const encryption = (password: string) => {
  return crypto.pbkdf2Sync(password, SECRET, 1000, 64, 'sha512').toString('hex')
}
