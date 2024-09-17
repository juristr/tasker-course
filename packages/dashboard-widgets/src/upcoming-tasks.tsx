'use client';

import { Task } from '@tasker/database/model';
import { TaskItem } from '@tasker/ui/task';

interface UpcomingTasksProps {
  tasks: Task[];
}

export function UpcomingTasks(props: UpcomingTasksProps) {
  return (
    <>
      <h3 className="mb-4 text-lg font-semibold">Upcoming Tasks</h3>
      {props.tasks.length > 0 ? (
        <>
          <p className="mb-4 text-sm text-gray-500">
            Tasks due in the next 7 days
          </p>
          <div className="grid gap-4">
            {props.tasks.map((t) => (
              <TaskItem key={t.id} task={t} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500">No upcoming tasks</p>
      )}
    </>
  );
}
