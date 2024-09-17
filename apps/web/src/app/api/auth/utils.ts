import type { User } from '@tasker/database/model';

import type { cookies } from 'next/headers';
import type { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { decodeJwt, jwtVerify, SignJWT } from 'jose';

const USER_TOKEN = 'user-token';

const JWT_SECRET_KEY: string | undefined =
  process.env.JWT_SECRET_KEY ?? 'super-secret-key';

export class AuthError extends Error {}

export function getUserData(store: ReturnType<typeof cookies>) {
  const token = store.get(USER_TOKEN)?.value;
  if (!token) throw new AuthError('Missing user token');
  try {
    const verified = decodeJwt(token);
    return verified as Pick<User, 'email' | 'name' | 'id'>;
  } catch (err) {
    throw new AuthError('Could not find user in session.');
  }
}

export async function verifyAuth(req: NextRequest) {
  const token = req.cookies.get(USER_TOKEN)?.value;

  if (!token) throw new AuthError('Missing user token');

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET_KEY),
    );
    return verified.payload as Pick<User, 'email' | 'name' | 'id'>;
  } catch (err) {
    throw new AuthError('Your token has expired.');
  }
}

export async function setUserCookie(
  user: Pick<User, 'email' | 'name' | 'id'>,
  res: NextResponse,
) {
  const token = await new SignJWT(user)
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(new TextEncoder().encode(JWT_SECRET_KEY));

  res.cookies.set(USER_TOKEN, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });

  return res;
}

export function expireUserCookie(res: NextResponse) {
  res.cookies.set(USER_TOKEN, '', { httpOnly: true, maxAge: 0 });
  return res;
}
