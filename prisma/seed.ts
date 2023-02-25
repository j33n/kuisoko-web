import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  const email = "johndoe@test.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("test12345", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.store.create({
    data: {
      name: faker.company.name(),
      comment: faker.lorem.sentence(),
      userId: user.id,
      location: faker.address.streetAddress(),
    },
  });

  await prisma.store.create({
    data: {
      name: faker.company.name(),
      comment: faker.lorem.sentence(),
      userId: user.id,
      location: faker.address.streetAddress(),
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
