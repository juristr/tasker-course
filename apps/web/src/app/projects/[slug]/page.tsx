import { db } from '@tasker/database';
import type { JSX } from 'react';
import { notFound } from 'next/navigation';
import { ProjectDetails } from '@tasker/ui/project';
import { CreateTaskButton } from '@tasker/ui/task';
import { cookies } from 'next/headers';
import { getUserData } from '../../api/auth/utils';

export default async function ProjectDetailsPage({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const project = await db.project.findUnique({
    where: { slug: params.slug },
  });

  if (!project) return notFound();

  const cookieStore = cookies();
  const userData = getUserData(cookieStore);
  const members = await db.user.findMany();
  const projects = await db.project.findMany();
  const tasks = await db.task.findMany({
    where: {
      deleted: false,
      projectId: project.id,
    },
    include: {
      AssigneesOnTasks: true,
    },
  });

  return (
    <>
      <ProjectDetails project={project} tasks={tasks} />
      <CreateTaskButton
        projects={projects}
        members={members}
        me={userData}
        defaultProject={project}
      />
    </>
  );
}
