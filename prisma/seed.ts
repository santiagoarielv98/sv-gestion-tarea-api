import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

function createRandomTask() {
  return {
    title: faker.lorem.words(),
    content: faker.lorem.paragraph(),
  };
}

function createRandomUser({ password }: { password: string }) {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password,
    tasks: {
      create: faker.helpers.multiple(createRandomTask, {
        count: faker.number.int({ min: 1, max: 15 }),
      }),
    },
  };
}

function createDemoUser({ password }: { password: string }) {
  return {
    name: "Demo User",
    email: "demo@example.com",
    password,
    tasks: {
      create: faker.helpers.multiple(createRandomTask, {
        count: faker.number.int({ min: 1, max: 15 }),
      }),
    },
  };
}

async function main() {
  const password = await bcrypt.hash(
    "password",
    parseInt(process.env.SALT_ROUNDS)
  );

  const users = faker.helpers.multiple(() => createRandomUser({ password }), {
    count: 5,
  });

  users.push(createDemoUser({ password }));

  await Promise.all(
    users.map((user) => {
      return prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: user,
      });
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
