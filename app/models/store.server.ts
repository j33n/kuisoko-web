import type { User, Store } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Store } from "@prisma/client";

export function getStore({
  id,
  userId,
}: Pick<Store, "id"> & {
  userId: User["id"];
}) {
  return prisma.store.findFirst({
    select: { id: true, name: true, comment: true, location: true, icon: true, cover: true },
    where: { id, userId },
  });
}

export function createStore({
  name,
  comment,
  location,
  userId,
}: Pick<Store, "name" | "comment" | "location"> & {
  userId: User["id"];
}) {
  
  return prisma.store.create({
    data: {
      name,
      comment,
      location,
      addedBy: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function getStores(userId: User["id"]) {
  return prisma.store.findMany({
    where: { addedBy: { id: userId } },
    select: {
      id: true,
      name: true,
      comment: true,
      location: true,
      icon: true,
      cover: true,
    },
    orderBy: { updatedAt: "desc" },
  });
};

export function deleteStore({
  id,
  userId,
}: Pick<Store, "id"> & { userId: User["id"] }) {
  return prisma.store.deleteMany({
    where: { id, userId },
  });
}

export function updateStoreName({
  id,
  name,
  userId
}: Pick<Store, "id" | "name"> & { userId: User["id"] }) {
  console.log("=================>>>>>>", id, name, userId)
  return prisma.store.update({
    where: { id },
    data: { name },
  });
}

export function updateStoreComment({
  id,
  comment,
  userId
}: Pick<Store, "id" | "comment"> & { userId: User["id"] }) {
  return prisma.store.update({
    where: { id },
    data: { comment },
  });
}
