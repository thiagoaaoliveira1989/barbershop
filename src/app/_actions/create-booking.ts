"use server";

import db from "../_lib/prisma";

interface Params {
  userId: string;
  serviceId: string;
  date: Date;
}

export const createBooking = async (params: Params) => {
  await db.booking.create({
    data: {
      serviceId: params.serviceId,
      userId: params.userId,
      date: params.date,
    },
  });
};
