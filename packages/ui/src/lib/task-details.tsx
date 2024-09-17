'use client';

import type {
  Project,
  TaskWithAssigneesOnTasks,
  User,
} from '@tasker/database/model';
import { Select } from '@headlessui/react';
import { SyntheticEvent, useState } from 'react';
import { CloudArrowUpIcon, TrashIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { TaskIndicator } from './task-item';
import { useToast } from '../toast';

interface TaskDetailsProps {
  task: TaskWithAssigneesOnTasks;
  projects: Project[];
  members: User[];
  me: { id: number };
}

export interface UpdateTaskData {
  id: number;
  title?: null | string;
  description?: null | string;
  projectId?: null | number;
  assigneeId?: null | number;
  status?: string;
  dueAt?: null | string;
}

export function TaskDetails({ task, members, projects }: TaskDetailsProps) {
  const toast = useToast();
  const router = useRouter();
  const [saveState, setSaveState] = useState<'saved' | 'pending' | 'idle'>(
    'idle',
  );

  const project = projects.find((p) => p.id === task.projectId);

  async function updateTask(data: UpdateTaskData): Promise<void> {
    try {
      setSaveState('pending');
      await fetch(`/api/tasks/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      setSaveState('saved');
      router.refresh();
      await new Promise((res) => setTimeout(res, 2000));
      setSaveState('idle');
    } catch (err) {
      console.error(err);
      setSaveState('idle');
      toast.error(`Failed to update task`);
    }
  }

  async function deleteTask(id: number): Promise<void> {
    const resp = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
    if (resp.status >= 400) {
      toast.error(`Failed to delete task`);
    } else {
      router.replace(`/projects/${project!.slug}`);
      router.refresh();
      toast.success('Successfully deleted task');
    }
  }

  return (
    <>
      <div className="relative mb-2">
        <div className="absolute right-0 top-0 flex gap-2">
          {saveState === 'pending' ? (
            <CloudArrowUpIcon className="h-5 w-5 text-gray-900" />
          ) : (
            <CloudArrowUpIcon className="h-5 w-5 text-gray-300" />
          )}
          <TrashIcon
            data-testid="task-delete"
            className="h-5 w-5 cursor-pointer text-red-800 hover:text-red-500"
            onClick={() => deleteTask(task.id)}
          />
        </div>
        <label className="block py-2 font-medium" htmlFor="title">
          Title
        </label>
        <input
          onChange={async (evt: SyntheticEvent<HTMLInputElement>) => {
            await updateTask({
              id: task.id,
              title: evt.currentTarget.value || task.title,
            });
          }}
          data-testid="task-input-title"
          id="title"
          className="w-full rounded border-2 border-white px-2 text-xl font-semibold outline-0 focus:border-indigo-500"
          defaultValue={task.title}
        />
      </div>
      <div className="mb-2">
        <label className="block py-2 font-medium" htmlFor="project">
          Project
        </label>
        <Select
          required
          data-testid="task-input-project"
          id="project"
          defaultValue={task.projectId as number}
          className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={async (evt: SyntheticEvent<HTMLSelectElement>) => {
            await updateTask({
              id: task.id,
              projectId: parseInt(evt.currentTarget.value) || task.projectId,
            });
          }}
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </Select>
      </div>
      <div className="mb-2">
        <label className="block py-2 font-medium" htmlFor="assignee">
          Assignee
        </label>
        <Select
          required
          data-testid="task-input-assignee"
          id="assignee"
          defaultValue={task.AssigneesOnTasks[0]?.assigneeId as number}
          className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={async (evt: SyntheticEvent<HTMLSelectElement>) => {
            await updateTask({
              id: task.id,
              assigneeId: evt.currentTarget.value
                ? parseInt(evt.currentTarget.value)
                : undefined,
            });
          }}
        >
          <option value=""></option>
          {members.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </Select>
      </div>
      <div className="mb-2">
        <label className="block py-2 font-medium" htmlFor="dueAt">
          Due Date
        </label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          data-testid="task-input-dueAt"
          id="dueAt"
          type="date"
          defaultValue={
            task.dueAt ? format(new Date(task.dueAt), 'yyyy-MM-dd') : ''
          }
          onChange={async (evt: SyntheticEvent<HTMLInputElement>) => {
            await updateTask({
              id: task.id,
              dueAt: evt.currentTarget.value,
            });
          }}
        />
      </div>
      <div className="mb-2">
        <label className="flex items-center py-2 font-medium" htmlFor="project">
          <span className="mr-2">Status</span>
          <TaskIndicator task={task} />
        </label>
        <Select
          required
          data-testid="task-input-status"
          id="status"
          defaultValue={task.status as string}
          className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={async (evt: SyntheticEvent<HTMLSelectElement>) => {
            await updateTask({
              id: task.id,
              status: evt.currentTarget.value,
            });
          }}
        >
          <option value="backlog">Backlog</option>
          <option value="in_progress">In progress</option>
          <option value="completed">Completed</option>
        </Select>
      </div>
      <div className="mb-2">
        <label className="block py-2 font-medium" htmlFor="description">
          Description
        </label>
        <textarea
          data-testid="task-input-description"
          id="description"
          className="text-md mb-6 h-[500px] w-full rounded border-2 border-white px-2 outline-0 focus:border-indigo-500"
          defaultValue={task.description as string}
          onChange={async (evt: SyntheticEvent<HTMLTextAreaElement>) => {
            await updateTask({
              id: task.id,
              description: evt.currentTarget.value,
            });
          }}
        />
      </div>
    </>
  );
}
