import { createHash } from 'crypto';
import * as jwt from 'jsonwebtoken';

export function md5(value: string) {
  return createHash('md5').update(value).digest('hex');
}

export function generateJWT(data: string, age: number) {
  return jwt.sign(
    {
      data,
    },
    process.env['SECRET_STRING'] || 'somesecret',
    { expiresIn: age }
  );
}

export function verifyJWT(token: string) {
  try {
    const result = jwt.verify(
      token,
      process.env['SECRET_STRING'] || 'somesecret'
    ) as { data: string };
    return result.data;
  } catch {
    return null;
  }
}
