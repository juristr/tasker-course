import type { JSX } from 'react';
import { Project } from '@tasker/database/model';
import Link from 'next/link';

interface ProjectItemProps {
  project: Project;
}

export function ProjectIndicator({ project: { status } }: ProjectItemProps) {
  if (status === 'on_track') {
    return <div className="h-2 w-2 rounded-full bg-green-300" />;
  } else if (status === 'off_track') {
    return <div className="h-2 w-2 rounded-full bg-yellow-300" />;
  } else {
    return <div className="h-2 w-2 rounded-full bg-red-300" />;
  }
}

export function ProjectItem({ project }: ProjectItemProps): JSX.Element {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="flex items-center justify-between"
    >
      <div className="flex items-center gap-2">
        <ProjectIndicator project={project} />
        <span className="text-sm font-medium text-gray-600">
          {project.name}
        </span>
      </div>
      <span
        data-testid="project-item-status"
        className="rounded-md border border-gray-200 border-gray-300 px-2 py-1 text-xs font-medium text-gray-600 dark:border-gray-800"
      >
        {project.status === 'on_track'
          ? 'On Track'
          : project.status === 'off_track'
            ? 'Behind Schedule'
            : 'At Risk'}
      </span>
    </Link>
  );
}

export { ProjectDetails } from './lib/project-details';
