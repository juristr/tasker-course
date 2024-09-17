const { addDays, subDays } = require('date-fns');
const { PrismaClient } = require('@prisma/client');
const { aliceAvatar, bobAvatar } = require('./_seed.data');

const db = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  const engProj = await db.project.upsert({
    where: { slug: 'ENG' },
    update: {},
    create: {
      slug: 'ENG',
      name: 'Engineering',
    },
  });

  const uxProj = await db.project.upsert({
    where: { slug: 'UX' },
    update: {},
    create: {
      slug: 'UX',
      name: 'Design',
    },
  });

  const alice = await db.user.upsert({
    where: { email: 'alice@tasker.io' },
    update: {},
    create: {
      email: 'alice@tasker.io',
      name: 'Alice Chen',
      password: '123456',
      avatarBase64: aliceAvatar,
    },
  });

  const bob = await db.user.upsert({
    where: { email: 'bob@tasker.io' },
    update: {},
    create: {
      email: 'bob@tasker.io',
      name: 'Bob Smith',
      password: '123456',
      avatarBase64: bobAvatar,
    },
  });

  const uxTask1 = await db.task.upsert({
    where: { slug: 'UX-1' },
    update: {},
    create: {
      slug: 'UX-1',
      title: 'Wireframing',
      description: `This task is to create the initial wireframe for the landing page`,
      createdAt: subDays(new Date(), 13),
      dueAt: addDays(new Date(), 4),
      status: 'backlog',
      projectId: uxProj.id,
      userId: bob.id,
    },
  });

  const uxTask2 = await db.task.upsert({
    where: { slug: 'UX-2' },
    update: {},
    create: {
      slug: 'UX-2',
      title: 'Customer Journey Mapping',
      description: `This task is to create the customer journey for the onboarding process.`,
      createdAt: subDays(new Date(), 5),
      dueAt: addDays(new Date(), 8),
      status: 'backlog',
      projectId: uxProj.id,
      userId: bob.id,
    },
  });

  const engTask1 = await db.task.upsert({
    where: { slug: 'ENG-1' },
    update: {},
    create: {
      slug: 'ENG-1',
      title: 'Landing page',
      description: `This task is to code the landing page based on the wireframe.`,
      createdAt: subDays(new Date(), 5),
      dueAt: addDays(new Date(), 1),
      status: 'backlog',
      projectId: engProj.id,
      userId: bob.id,
    },
  });

  const engTask2 = await db.task.upsert({
    where: { slug: 'ENG-2' },
    update: {},
    create: {
      slug: 'ENG-2',
      title: 'Secondary page',
      description: `This task is to create the second page as a part of the onboarding process.`,
      createdAt: subDays(new Date(), 14),
      dueAt: addDays(new Date(), 0),
      status: 'backlog',
      projectId: engProj.id,
      userId: alice.id,
    },
  });

  if (
    !(await db.assigneesOnTasks.findFirst({
      where: {
        assigneeId: alice.id,
        taskId: engTask1.id,
      },
    }))
  ) {
    await db.assigneesOnTasks.create({
      data: { assigneeId: alice.id, taskId: engTask1.id },
    });
  }

  if (
    !(await db.assigneesOnTasks.findFirst({
      where: {
        assigneeId: bob.id,
        taskId: uxTask1.id,
      },
    }))
  ) {
    await db.assigneesOnTasks.create({
      data: { assigneeId: bob.id, taskId: uxTask1.id },
    });
  }

  console.log('Seeding complete!');
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
