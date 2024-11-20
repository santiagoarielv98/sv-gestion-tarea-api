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

function createRandomUser({ password }) {
  return {
    userId: faker.string.uuid(),
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

async function main() {
  const password = await bcrypt.hash(
    "password",
    parseInt(process.env.SALT_ROUNDS)
  );

  faker.helpers.multiple(() => createRandomUser({ password }), {
    count: 5,
  });
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
