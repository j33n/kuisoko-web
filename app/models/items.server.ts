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

// export function getItemListItems({ userId }: { userId: User["id"] }) {
//   return prisma.item.findMany({
//     where: { userId },
//     select: { id: true, name: true },
//     orderBy: { updatedAt: "desc" },
//   });
// }

export function createItem({
  name,
  comment,
  price,
  currency,
  icon,
  tags,
  quantity,
  unit,
}: Pick<Item, "name" | "comment" | "price" | "currency" | "icon" |"tags" |"quantity" | "unit"> & {
  userId: User["id"];
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
