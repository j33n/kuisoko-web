import type {
  User,
  Item,
  Store,
  ItemCustomField,
  CustomField,
} from "@prisma/client";

import { prisma } from "~/db.server";
import { log } from "./log.server";
import { getUserById } from "./user.server";
import fieldTypes from "~/data/fieldTypes";

import type { CustomFieldProps } from "~/data/fieldTypes";
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
      itemCustomFields: {
        select: {
          id: true,
          customName: true,
          value: true,
          field: {
            select: {
              name: true,
              icon: true,
              type: true,
              default: true,
              supported: true,
            },
          },
          order: true,
        },
      },
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

export async function getCustomItemFields(itemId: Item["id"]) {
  return prisma.itemCustomField.findMany({
    where: { belongsTo: { id: itemId } },
    select: {
      id: true,
      customName: true,
      value: true,
      order: false,
      itemId: false,
    },
  });
}

export async function saveItemCustomField({
  type,
  customName,
  itemId,
}: Pick<CustomField, "type"> &
  Pick<ItemCustomField, "customName" | "itemId"> & {
    userId: User["id"];
  }) {
  let customFieldExist = null;

  customFieldExist = await prisma.customField.findFirst({
    where: { type },
  });

  if (!customFieldExist) {
    const customType = fieldTypes.find(
      (fieldType: CustomFieldProps) => fieldType.type === type
    );

    if (!customType) {
      throw new Response("fieldTypes missing on the client", { status: 500 });
    }

    customFieldExist = await prisma.customField.create({
      data: {
        name: customType.name,
        type: customType.type,
        icon: customType.icon,
        default: customType.default,
        supported: customType.supported,
      },
    });
  }

  if (!customFieldExist || !customFieldExist.id) {
    throw new Response(`missing field ${type} in db`, { status: 500 });
  }

  return prisma.itemCustomField.create({
    data: {
      customName,
      belongsTo: {
        connect: {
          id: itemId,
        },
      },
      field: {
        connect: {
          id: customFieldExist.id,
        },
      },
    },
  });
}

export async function updateItemCustomField({
  id,
  customName,
}: Pick<ItemCustomField, "id" | "customName"> & {
  userId: User["id"];
}) {
  return prisma.itemCustomField.update({
    where: {
      id,
    },
    data: {
      customName,
    },
  });
}

export async function deleteItemCustomField({
  id,
}: Pick<ItemCustomField, "id"> & {
  userId: User["id"];
}) {
  return prisma.itemCustomField.delete({
    where: {
      id,
    },
  });
}

export async function updateItemDetails({
  id,
  name,
  comment,
  price,
  quantity,
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
