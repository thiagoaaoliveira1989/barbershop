"use server";

import db from "../_lib/prisma";

export const getBookings = async (id?: string) => {
  return await db.booking.findMany({
    where: id ? { userId: id } : {},
    include: {
      service: {
        include: {
          barbershop: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
              address: true,
              phones: true,
              totalRatings: true,
              avaliation: true,
              description: true,
              ratings: {
                select: {
                  id: true,
                  rating: true,
                  comment: true,
                  userId: true,
                  barbershopId: true,
                },
              },
            },
          },
        },
      },
    },
  });
};
