import React, { JSX, ReactNode } from 'react';
import { Sidebar } from '@tasker/sidebar';

export default async function TaskLayout({
  children,
}: {
  children: ReactNode;
}): Promise<JSX.Element> {
  return (
    <div className="flex h-screen w-full">
      <div className="flex w-64 flex-col items-start justify-between border-r bg-white p-8">
        <Sidebar />
      </div>
      <div className="w-full max-w-screen-lg p-8">{children}</div>
    </div>
  );
}
