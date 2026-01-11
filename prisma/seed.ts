import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.create({
    data: {
      login: "user",
      passwordHash: "2312312",
      rating: 1000,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      login: "user2",
      passwordHash: "2312312",
      rating: 1200,
    },
  });
  await prisma.game.create({
    data: {
      status: "idle",
      players: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      status: "idle",
      players: {
        connect: {
          id: user2.id,
        },
      },
    },
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
