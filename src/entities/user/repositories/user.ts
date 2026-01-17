import { db } from "@/shared/lib/db";
import { UserEntity } from "../domain";
import { Prisma } from "@/prisma/client";

export function saveUser(user: UserEntity): Promise<UserEntity> {
  return db.user.upsert({
    where: {
      id: user.id,
    },
    create: user,
    update: user,
  });
}

export function getUser(where: Prisma.UserWhereInput) {
  return db.user.findFirst({ where });
}

export const userRepository = { saveUser, getUser };
