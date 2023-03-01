import type { User, Log } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Log } from "@prisma/client";

export function log({
  type,
  event,
  description,
  icon,
  notify,
  userId,
}: Pick<Log, "type" | "event" | "description" | "icon" | "notify"> & {
  userId: User["id"];
}) {
    console.log("=====================>>>>>", description);
  return prisma.log.create({
    data: {
      type,
      event,
      description,
      icon,
      notify,
      addedBy: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
