import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

export const passwordToHash = async (
  password: string,
  defaultSalt?: string,
) => {
  const salt = defaultSalt || randomBytes(8).toString('hex');
  const buf = (await scrypt(password, salt, 32)) as Buffer;
  const hashedPassword = buf.toString('hex');

  return [`${salt}.${buf.toString('hex')}`, hashedPassword];
};
