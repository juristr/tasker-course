'use client';

import { useRouter } from 'next/navigation';
import type { Project, User } from '@tasker/database/model';
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Select,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { FormEvent, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useToast } from '../toast';

export interface CreateTaskData {
  title: string;
  description: string;
  projectId: number;
  assigneeId: number;
  dueAt: string;
}

interface CreateTaskButtonProps {
  me: { id: number };
  members: User[];
  projects: Project[];
  defaultProject?: Project;
}

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  description: HTMLTextAreaElement;
  project: HTMLSelectElement;
  assignee: HTMLSelectElement;
  dueAt: HTMLInputElement;
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export function CreateTaskButton(props: CreateTaskButtonProps) {
  const toast = useToast();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const handleSubmit = async (evt: FormEvent<FormElement>) => {
    evt.preventDefault();
    const title = evt.currentTarget.elements.title.value;
    const description = evt.currentTarget.elements.description.value;
    const projectId = evt.currentTarget.elements.project.value;
    const assigneeId = evt.currentTarget.elements.assignee.value;
    const dueAt = evt.currentTarget.elements.dueAt.value;
    const data = {
      title,
      description,
      projectId: parseInt(projectId),
      assigneeId: parseInt(assigneeId),
      dueAt,
    };
    await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    router.refresh();
    close();
    toast.success('Successfully created task');
  };

  return (
    <>
      <div className="fixed bottom-6 right-6">
        <button
          data-testid="create-task-button"
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={open}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          New Task
        </button>
      </div>

      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-950/50 backdrop-blur-sm">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6">
                  <DialogTitle as="h3" className="text-base/7 font-medium">
                    New task
                  </DialogTitle>
                  <form
                    data-testid="create-task-form"
                    className="mt-2 text-sm/6 text-black/50"
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-2">
                      <label className="block py-2 font-medium" htmlFor="title">
                        Title
                      </label>
                      <input
                        data-autofocus
                        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                        data-testid="create-task-input-title"
                        id="title"
                        placeholder="Do something..."
                        required
                        type="text"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        className="block py-2 font-medium"
                        htmlFor="description"
                      >
                        Description
                      </label>
                      <textarea
                        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                        data-testid="create-task-input-description"
                        id="description"
                        rows={10}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        className="block py-2 font-medium"
                        htmlFor="project"
                      >
                        Project
                      </label>
                      <Select
                        required
                        id="project"
                        data-testid="create-task-input-project"
                        className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue={props.defaultProject?.id ?? ''}
                      >
                        {props.projects.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="mb-2">
                      <label
                        className="block py-2 font-medium"
                        htmlFor="assignee"
                      >
                        Assignee
                      </label>
                      <Select
                        required
                        data-testid="create-task-input-assignee"
                        id="assignee"
                        className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        {props.members.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
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
                        data-testid="create-task-input-dueAt"
                        id="dueAt"
                        type="date"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-end gap-4">
                      <Button
                        data-testid="create-task-submit"
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      >
                        Create
                      </Button>
                      <Button
                        data-testid="create-task-cancel"
                        className="order-first text-sm text-gray-500"
                        onClick={close}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
