import { db } from '@tasker/database';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getUserData } from '../auth/utils';
import { parse } from 'date-fns';

export async function POST(req: Request) {
  const me = getUserData(cookies());
  const data = await req.json();
  const project = await db.project.findUniqueOrThrow({
    where: { id: data.projectId },
  });

  let task = await db.task.create({
    data: {
      userId: me.id,
      status: 'backlog',
      createdAt: new Date(),
      dueAt: data.dueAt
        ? parse(data.dueAt, 'yyyy-MM-dd', new Date())
        : undefined,
      projectId: data.projectId,
      title: data.title,
      description: data.description,
    },
  });

  task = await db.task.update({
    where: { id: task.id },
    data: {
      slug: `${project.slug}-${task.id}`,
    },
  });

  await db.assigneesOnTasks.create({
    data: {
      assigneeId: data.assigneeId,
      taskId: task.id,
    },
  });

  return NextResponse.json(task, { status: 201 });
}
