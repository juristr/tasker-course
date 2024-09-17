import React, { JSX, ReactNode } from 'react';
import { Sidebar } from '@tasker/sidebar';
import { CreateTaskButton } from '@tasker/ui/task';
import { cookies } from 'next/headers';
import { getUserData } from '../api/auth/utils';
import { db } from '@tasker/database';

export default async function TaskLayout({
  children,
}: {
  children: ReactNode;
}): Promise<JSX.Element> {
  const cookieStore = cookies();
  const userData = getUserData(cookieStore);
  const members = await db.user.findMany();
  const projects = await db.project.findMany();
  return (
    <div className="flex h-screen w-full">
      <div className="flex w-64 flex-col items-start justify-between border-r bg-white p-8">
        <Sidebar />
      </div>
      <div className="w-full max-w-screen-lg p-8">{children}</div>
      <CreateTaskButton projects={projects} members={members} me={userData} />
    </div>
  );
}
