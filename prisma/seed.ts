import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import * as bcrypt from "bcrypt";
import { userDemoConfig } from "../src/config/user-demo.config";

const prisma = new PrismaClient();

function createRandomTag() {
  return {
    name: faker.lorem.word(),
  };
}

function createRandomTask() {
  return {
    title: faker.lorem.words(),
    content: faker.lorem.paragraph(),
    completed: faker.datatype.boolean({ probability: 0.3 }),
  };
}

function createRandomUser({ password }: { password: string }) {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password,
    tasks: {
      create: faker.helpers.multiple(createRandomTask, {
        count: faker.number.int({ min: 1, max: 5 }),
      }),
    },
  };
}

function createDemoUser({ password }: { password: string }) {
  return {
    name: userDemoConfig.name,
    email: userDemoConfig.email,
    password,
    tags: {
      create: faker.helpers.multiple(createRandomTag, {
        count: faker.number.int({ min: 15, max: 55 }),
      }),
    },
    tasks: {
      create: faker.helpers.multiple(createRandomTask, {
        count: faker.number.int({ min: 15, max: 55 }),
      }),
    },
  };
}

async function main() {
  const isDemoUserExist = await prisma.user.findUnique({
    where: { email: userDemoConfig.email },
  });

  if (isDemoUserExist) {
    return;
  }


  const password = await bcrypt.hash(
    userDemoConfig.password,
    parseInt(process.env.SALT_ROUNDS)
  );

  const users = faker.helpers.multiple(() => createRandomUser({ password }), {
    count: 5,
  });

  users.push(createDemoUser({ password }));

  const createUsers = await Promise.all(
    users.map((user) => {
      return prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: user,
        include: {
          tags: true,
          tasks: true,
        },
      });
    })
  );

  await Promise.all(
    createUsers.map(async (user) => {
      const tasks = user.tasks;
      const tags = user.tags;

      await Promise.all(
        tasks.map(async (task) => {
          const randomTags = faker.helpers.arrayElements(tags, {
            min: 1,
            max: 5,
          });

          await prisma.task.update({
            where: { id: task.id },
            data: {
              tags: {
                connect: randomTags.map((tag) => ({ id: tag.id })),
              },
            },
          });
        })
      );
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
