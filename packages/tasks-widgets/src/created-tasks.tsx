import { Project, Task } from '@tasker/database/model';
import Link from 'next/link';
import { TaskIndicator } from '@tasker/ui/task';

interface CreatedTasksProps {
  tasks: Task[];
  projects: Project[];
}

export function CreatedTasks(props: CreatedTasksProps) {
  return (
    <>
      <h3 className="mb-4 text-lg font-semibold">My Created Tasks</h3>
      <p className="mb-4 text-sm text-gray-500">Tasks you have created</p>
      {props.tasks.length > 0 ? (
        <div className="grid gap-4">
          {props.tasks.map((t) => (
            <Link
              href={`/tasks/${t.slug}`}
              key={t.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <TaskIndicator task={t} />
                <span className="text-sm font-medium text-gray-600">
                  {t.title}
                </span>
              </div>
              <span className="title rounded-md border border-gray-300 px-2 py-1 text-xs font-medium capitalize text-gray-600">
                {t.slug}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No tasks created</p>
      )}
    </>
  );
}
