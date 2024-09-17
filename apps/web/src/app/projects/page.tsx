import type { JSX } from 'react';
import { db } from '@tasker/database';
import { Card } from '@tasker/ui/card';

export const revalidate = 0;

export default async function ProjectsPage(): Promise<JSX.Element> {
  const projects = await db.project.findMany({
    include: {
      Task: true,
    },
  });
  return (
    <>
      <h2 className="text-xl font-semibold">Projects</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <Card key={p.slug} href={`/projects/${p.slug}`} title={p.name}>
            <div data-testid="project-item" className="flex items-center">
              <span className="flex-1">{p.name}</span>
              <span className="rounded-md border border-gray-200 border-gray-300 px-2 py-1 text-xs font-medium text-gray-600 dark:border-gray-800">
                {p.slug}
              </span>
            </div>
            <p className="my-3 text-sm text-gray-500">Tasks: {p.Task.length}</p>
          </Card>
        ))}
      </div>
    </>
  );
}
