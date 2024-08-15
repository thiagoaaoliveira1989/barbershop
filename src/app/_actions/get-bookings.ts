"use server";

import db from "../_lib/prisma";

export const getBookings = async (id?: string) => {
  return await db.booking.findMany({
    where: id ? { userId: id } : {},
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  });
};
