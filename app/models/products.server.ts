import type { User, Product } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Product } from "@prisma/client";

export function getProduct({
  id,
  userId,
}: Pick<Product, "id"> & {
  userId: User["id"];
}) {
  return prisma.product.findFirst({
    select: { id: true, body: true, title: true },
    where: { id, userId },
  });
}

export function getProductListItems({ userId }: { userId: User["id"] }) {
  return prisma.product.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createProduct({
  body,
  title,
  userId,
}: Pick<Product, "body" | "title"> & {
  userId: User["id"];
}) {
  return prisma.product.create({
    data: {
      title,
      body,
      user: {
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
}: Pick<Product, "id"> & { userId: User["id"] }) {
  return prisma.product.deleteMany({
    where: { id, userId },
  });
}
