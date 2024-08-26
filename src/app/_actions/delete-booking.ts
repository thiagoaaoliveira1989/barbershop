"use server";

import db from "../_lib/prisma";

export const deleteBooking = async (id: string) => {
  await db.booking.delete({
    where: {
      id,
    },
  });
};
