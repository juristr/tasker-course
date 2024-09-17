'use client';

import type { JSX, SyntheticEvent } from 'react';
import type { Project, TaskWithAssigneesOnTasks } from '@tasker/database/model';
import { ProjectIndicator } from '../project';
import { Select } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { TaskItem } from './task-item';

interface ProjectDetailsProps {
  project: Project;
  tasks: TaskWithAssigneesOnTasks[];
}

export function ProjectDetails({
  project,
  tasks,
}: ProjectDetailsProps): JSX.Element {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center">
        <h2 className="mr-2 text-xl font-semibold">{project.name}</h2>
        <ProjectIndicator project={project} />
        <div className="flex flex-1 justify-end">
          <Select
            data-testid="project-input-status"
            defaultValue={project.status}
            className="block rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={async (evt: SyntheticEvent<HTMLSelectElement>) => {
              await fetch(`/api/projects/${project.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                  status: evt.currentTarget.value,
                }),
              });
              router.refresh();
            }}
          >
            <option value="on_track">On track</option>
            <option value="off_track">Off track</option>
            <option value="at_risk">At risk</option>
          </Select>
        </div>
      </div>
      <h3 className="my-4">Tasks</h3>
      <div className="flex flex-col gap-4">
        {tasks.length > 0 ? (
          tasks.map((t) => <TaskItem key={t.id} task={t} />)
        ) : (
          <p className="text-gray-500">No tasks found</p>
        )}
      </div>
    </>
  );
}
