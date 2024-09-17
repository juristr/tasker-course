import type { Project, Task } from '@tasker/database/model';
import { TaskItem } from '@tasker/ui/task';

interface MyTasksProps {
  tasks: Task[];
  projects: Project[];
}

export function MyTasks(props: MyTasksProps) {
  return (
    <>
      <h3 className="mb-4 text-lg font-semibold">My Tasks</h3>
      <p className="mb-4 text-sm text-gray-500">Tasks assigned to you</p>
      {props.tasks.length > 0 ? (
        <div className="grid gap-4" data-testid="my-tasks">
          {props.tasks.map((t) => (
            <TaskItem key={t.id} task={t} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No tasks assigned</p>
      )}
    </>
  );
}
