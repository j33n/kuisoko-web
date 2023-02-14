import type { User, Item } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Item } from "@prisma/client";

export function getItem({
  id,
  userId,
}: Pick<Item, "id"> & {
  userId: User["id"];
}) {
  return prisma.item.findFirst({
    select: {
      id: true,
      name: true,
      comment: true,
      price: true,
      currency: true,
      icon: true,
      tags: true,
      quantity: true,
      unit: true,
      updatedAt: true,
    },
    where: { id, userId },
  });
}

export function createItem({
  name,
  comment,
  price,
  currency,
  icon,
  tags,
  quantity,
  unit,
  userId,
  storeId,
}: Pick<Item, "name" | "comment" | "price" | "currency" | "icon" |"tags" |"quantity" | "unit"> & {
  userId: User["id"];
  storeId: Item["storeId"];
}) {
  return prisma.item.create({
    data: {
      name,
      comment,
      price,
      currency,
      icon,
      tags,
      quantity,
      unit,
      belongsTo: {
        connect: {
          id: storeId,
        },
      },
      addedBy: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteItem({
  id,
  userId,
}: Pick<Item, "id"> & { userId: User["id"] }) {
  return prisma.item.deleteMany({
    where: { id, userId },
  });
}
