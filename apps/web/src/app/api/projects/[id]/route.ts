import { db } from '@tasker/database';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { status } = await req.json();
  const project = await db.project.update({
    where: { id: parseInt(params.id) },
    data: {
      status,
    },
    include: {
      Task: true,
    },
  });
  return NextResponse.json(project);
}
