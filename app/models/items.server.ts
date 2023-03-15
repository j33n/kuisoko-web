import type { User, Item, Store } from "@prisma/client";

import { prisma } from "~/db.server";
import { log } from "./log.server";
import { getUserById } from "./user.server";

export type { Item } from "@prisma/client";

export function getAllItems(userId: User["id"]) {
  return prisma.item.findMany({
    where: { addedBy: { id: userId } },
    select: {
      id: true,
      name: true,
      comment: true,
      price: true,
      currency: true,
      images: true,
      categories: true,
      itemCustomFields: true,
      unit: true,
      quantity: true,
      createdAt: true,
      storeId: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export function getStoreItems(storeId: Store["id"], userId: User["id"]) {
  return prisma.item.findMany({
    where: { addedBy: { id: userId }, belongsTo: { id: storeId } },
    select: {
      id: true,
      name: true,
      comment: true,
      price: true,
      currency: true,
      images: true,
      categories: true,
      unit: true,
      quantity: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export function getItem({
  id,
  storeId,
  userId,
}: Pick<Item, "id" | "storeId"> & {
  userId: User["id"];
}) {
  return prisma.item.findFirst({
    select: {
      id: true,
      name: true,
      comment: true,
      price: true,
      currency: true,
      images: true,
      categories: true,
      quantity: true,
      unit: true,
      updatedAt: true,
    },
    where: { id, userId, storeId },
  });
}

export async function createItem({
  name,
  comment,
  price,
  quantity,
  userId,
  storeId,
}: Pick<Item, "name" | "comment" | "price" | "quantity"> & {
  userId: User["id"];
  storeId: Item["storeId"];
}) {
  const user = await getUserById(userId);

  if (user) {
    await log({
      type: "info",
      event: "create item",
      description: `User ${user.names || user.email} created store ${name}`,
      icon: "🛒",
      notify: false,
      userId,
    });
  }

  return prisma.item.create({
    data: {
      name,
      comment,
      price,
      quantity,
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

export async function updateItemDetails({
  id,
  name,
  comment,
  price,
  quantity,
  userId,
}: Pick<Item, "id" | "name" | "comment" | "price" | "quantity"> & {
  userId: User["id"];
  storeId: Item["storeId"];
}) {
  return prisma.item.update({
    where: {
      id,
    },
    data: {
      name,
      comment,
      price,
      quantity,
    },
  });
}

export function updateItemImages({
  id,
  images,
}: Pick<Item, "id" | "images"> & { userId: User["id"] }) {
  return prisma.item.update({
    where: { id },
    data: { images },
  });
}

export async function deleteItem({
  id,
  userId,
}: Pick<Item, "id"> & { userId: User["id"] }) {
  const user = await getUserById(userId);

  if (user) {
    await log({
      type: "info",
      event: "delete item",
      description: `User ${
        user.names || user.email
      } deleted item with id ${id}`,
      icon: "🗑",
      notify: false,
      userId,
    });
  }
  return prisma.item.delete({
    where: { id },
  });
}
