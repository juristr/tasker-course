import React, { JSX } from 'react';
import { cookies } from 'next/headers';
import { CreatedTasks, MyTasks } from '@tasker/tasks-widgets';
import { db } from '@tasker/database';
import { getUserData } from '../api/auth/utils';

export default async function Tasks(): Promise<JSX.Element> {
  const cookieStore = cookies();
  const userData = getUserData(cookieStore);
  const myTasks = (
    await db.assigneesOnTasks.findMany({
      where: {
        assigneeId: userData.id,
        task: {
          deleted: false,
        },
      },
      orderBy: {
        task: {
          createdAt: 'asc',
        },
      },
      include: {
        task: {},
      },
    })
  ).map((x) => x.task);
  const createdTasks = await db.task.findMany({
    where: {
      deleted: false,
      userId: userData.id,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });
  const projects = await db.project.findMany();
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      <div className="bg-white text-gray-900">
        <MyTasks tasks={myTasks} projects={projects} />
      </div>
      <div className="bg-white text-gray-900">
        <CreatedTasks tasks={createdTasks} projects={projects} />
      </div>
    </div>
  );
}
