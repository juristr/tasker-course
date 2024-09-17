import type {
  Prisma,
  User,
  Task,
  Project,
  AssigneesOnTasks,
} from '@prisma/client';

export type TaskWithAssigneesOnTasks = Prisma.TaskGetPayload<{
  include: {
    AssigneesOnTasks: true;
  };
}>;

export type ProjectWithTasks = Prisma.ProjectGetPayload<{
  include: {
    Task: true;
  };
}>;

export { User, Task, Project, AssigneesOnTasks };
