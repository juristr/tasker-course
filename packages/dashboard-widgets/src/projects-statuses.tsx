import type { JSX } from 'react';
import { ProjectWithTasks } from '@tasker/database/model';
import { ProjectItem } from '@tasker/ui/project';

interface ProjectsStatusesProps {
  projects: ProjectWithTasks[];
}

export function ProjectsStatuses({
  projects,
}: ProjectsStatusesProps): JSX.Element {
  return (
    <>
      <h3 className="mb-4 text-lg font-semibold">Projects</h3>
      <p className="mb-4 text-sm text-gray-500">
        Active projects and their status
      </p>
      <div className="grid gap-4">
        {projects.map((p: ProjectWithTasks) => (
          <ProjectItem key={p.id} project={p} />
        ))}
      </div>
    </>
  );
}
