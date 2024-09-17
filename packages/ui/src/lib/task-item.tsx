import Link from 'next/link';
import { formatRelative } from 'date-fns';
import { enUS } from 'date-fns/locale';
import type { Task } from '@tasker/database/model';

const formatRelativeLocale = {
  lastWeek: 'dd/MM/yyyy',
  yesterday: "'yesterday'",
  today: "'today'",
  tomorrow: "'tomorrow'",
  nextWeek: "'this week'",
  other: 'dd/MM/yyyy',
};

const locale = {
  ...enUS,
  formatRelative: (token: keyof typeof formatRelativeLocale) =>
    formatRelativeLocale[token],
};

interface TaskProps {
  task: Task;
}

export function TaskIndicator({ task: { status } }: TaskProps) {
  if (status === 'completed') {
    return <div className="h-2 w-2 rounded-full bg-green-300" />;
  } else if (status === 'in_progress') {
    return <div className="h-2 w-2 rounded-full bg-yellow-300" />;
  } else {
    return <div className="h-2 w-2 rounded-full bg-gray-300" />;
  }
}

export function TaskItem({ task }: TaskProps) {
  return (
    <Link
      data-testid="task-item"
      href={`/tasks/${task.slug}`}
      className="flex items-center justify-between"
    >
      <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
        <TaskIndicator task={task} />
        {task.title}
      </div>
      <div className="flex-1"></div>
      {task.dueAt && (
        <span className="rounded-md border border-gray-300 px-2 py-1 text-xs font-medium text-gray-600">
          Due{' '}
          {formatRelative(task.dueAt, new Date(), {
            locale,
          })}
        </span>
      )}
    </Link>
  );
}
