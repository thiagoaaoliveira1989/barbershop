"use server";

import db from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";

export const updateAvaliationBarbershop = async (
  id: string,
  starNumber: number,
  comment?: string,
) => {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return notFound();
  }

  const userId = session.user.id;

  if (!starNumber) return;

  const result = await db.barbershop.findFirst({
    where: {
      id,
    },
  });

  if (!result) {
    throw new Error("Barbershop not found");
  }

  const { totalRatings, avaliation } = result;

  const novaAvaliacao =
    (avaliation * totalRatings + starNumber) / (totalRatings + 1);

  await db.barbershop.update({
    where: {
      id,
    },
    data: {
      avaliation: novaAvaliacao,
      totalRatings: totalRatings + 1,
    },
  });

  // Criar nova avaliação
  await db.barbershopRating.create({
    data: {
      rating: starNumber,
      comment,
      userId,
      barbershopId: id,
    },
  });
};
