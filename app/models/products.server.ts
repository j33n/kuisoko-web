import type { User, Item } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Item } from "@prisma/client";

export function getProduct({
  id,
  userId,
}: Pick<Item, "id"> & {
  userId: User["id"];
}) {
  return prisma.item.findFirst({
    select: { id: true, body: true, title: true },
    where: { id, userId },
  });
}

export function getProductListItems({ userId }: { userId: User["id"] }) {
  return prisma.item.findMany({
    where: { userId },
    select: { id: true, name: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createProduct({
  name,
  description,
  userId,
}: Pick<Item, "name" | "description"> & {
  userId: User["id"];
}) {
  return prisma.item.create({
    data: {
      name,
      description,
      addedBy: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteProduct({
  id,
  userId,
}: Pick<Item, "id"> & { userId: User["id"] }) {
  return prisma.item.deleteMany({
    where: { id, userId },
  });
}
