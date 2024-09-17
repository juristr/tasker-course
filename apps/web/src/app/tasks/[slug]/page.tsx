import { db } from '@tasker/database';
import type { JSX } from 'react';
import { notFound } from 'next/navigation';
import { TaskDetails } from '@tasker/ui/task';
import { cookies } from 'next/headers';
import { getUserData } from '../../api/auth/utils';

export default async function TaskDetailsPage({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const task = await db.task.findUnique({
    where: { slug: params.slug, deleted: false },
    include: {
      AssigneesOnTasks: true,
    },
  });
  const cookieStore = cookies();
  const userData = getUserData(cookieStore);
  const members = await db.user.findMany();
  const projects = await db.project.findMany();

  if (!task) return notFound();

  return (
    <TaskDetails
      task={task}
      me={userData}
      members={members}
      projects={projects}
    />
  );
}
