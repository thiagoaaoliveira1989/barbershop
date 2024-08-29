import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { Barbershop } from "@prisma/client";

type BarbershopItemProps = {
  barber: Barbershop;
};

export const BarbershopItem = ({ barber }: BarbershopItemProps) => {
  return (
    <header>
      <Card className="min-w-[167px] rounded-2xl mt-3 bg-[#26272B]">
        <CardContent className="p-0 px-1 pt-1">
          <div className="relative h-[159px] w-full">
            <Image
              src={barber.imageUrl} // Usando interpolação correta para a URL da imagem
              alt={barber.name} // Usando o nome da barbearia como texto alternativo
              fill
              className=" object-cover rounded-2xl"
            />

            <Badge
              className="absolute left-2 top-2 gap-1  bg-[#353638]"
              variant="secondary"
            >
              <StarIcon size={12} className="fill-primary text-primary " />
              <p className="text-xs font-semibold">{barber.avaliation}</p>
            </Badge>
          </div>
          <div className="px-1 py-3">
            <p className="font-[Munito] font-semibold text-[1rem] overflow-hidden truncate leading-[22.4px]">
              {barber.name}
            </p>
            <p className="font-[Munito] font-normal text-[12px] leading-[22.4px] truncate text-gray-400">
              {barber.address}
            </p>
            <Button
              variant="secondary"
              className="rounded-xl mt-3 w-full hover:bg-primary"
            >
              <Link href={`barbershop/${barber.id}`}>Reservar</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </header>
  );
};
