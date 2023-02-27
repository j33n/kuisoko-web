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
    orderBy: { createdAt: "desc" },
  });
};

export function getFavoriteStores(userId: User["id"]) {
  return prisma.store.findMany({
    where: { addedBy: { id: userId }, favorite: true },
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
}: Pick<Store, "id" | "name" > & { userId: User["id"] }) {
  return prisma.store.update({
    where: { id },
    data: { name },
  });
}

export function updateStoreComment({
  id,
  comment,
}: Pick<Store, "id" | "comment"> & { userId: User["id"] }) {
  return prisma.store.update({
    where: { id },
    data: { comment },
  });
}

export function updateStoreIcon({
  id,
  icon,
}: Pick<Store, "id" | "icon"> & { userId: User["id"] }) {
  return prisma.store.update({
    where: { id },
    data: { icon },
  });
}

export function updateStoreBody({
  id,
  body,
}: Pick<Store, "id" | "body"> & { userId: User["id"] }) {
  return prisma.store.update({
    where: { id },
    data: { body },
  });
}

export function updateStoreFavorite({
  id,
  favorite,
  userId
}: Pick<Store, "id" | "favorite"> & { userId: User["id"] }) {
  return prisma.store.update({
    where: { id },
    data: { favorite },
  });
}
