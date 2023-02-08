import type { User, Store } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Store } from "@prisma/client";

export function getStore({
  id,
  userId,
}: Pick<Store, "id"> & {
  userId: User["id"];
}) {
  return prisma.note.findFirst({
    select: { id: true, body: true, title: true },
    where: { id, userId },
  });
}

export function createStore({
  name,
  comment,
  icon,
  location,
  userId,
}: Pick<Store, "name" | "comment" | "icon" | "location"> & {
  userId: User["id"];
}) {
  
  return prisma.store.create({
    data: {
      name,
      comment,
      icon,
      location,
      addedBy: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteStore({
  id,
  userId,
}: Pick<Store, "id"> & { userId: User["id"] }) {
  return prisma.note.deleteMany({
    where: { id, userId },
  });
}
