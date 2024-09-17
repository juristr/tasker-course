import { db } from '@tasker/database';
import { NextResponse } from 'next/server';
import { expireUserCookie, setUserCookie } from './utils';

export async function POST(req: Request) {
  const data = await req.json();
  const { email, password } = data;

  if (!email || !password) {
    return NextResponse.json(
      { success: false },
      {
        status: 401,
      },
    );
  }

  try {
    const { id, name } = await db.user.findUniqueOrThrow({
      where: { email, password },
    });
    const res = NextResponse.json({ success: true });
    return setUserCookie({ id, email, name }, res);
  } catch {
    return NextResponse.json(
      { success: false },
      {
        status: 401,
      },
    );
  }
}

export async function DELETE() {
  try {
    return await expireUserCookie(NextResponse.json({ success: true }));
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
