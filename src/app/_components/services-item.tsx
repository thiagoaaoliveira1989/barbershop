import { BarbershopService } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface props {
  service: BarbershopService;
}

const ServiceItem = ({ service }: props) => {
  return (
    <Card className="">
      <CardContent className="flex items-center gap-3 p-3">
        <div className="relative min-h-[110px] min-w-[110px] max-w-[110px] max-h-[110px]">
          <Image
            src={service.imageUrl} // Usando interpolação correta para a URL da imagem
            alt={service.name} // Usando o nome da barbearia como texto alternativo
            fill
            className=" object-cover rounded-lg"
          />
        </div>

        <div className="space-y-2 w-full">
          <h3 className="font-semibold text-sm">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>

          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("pt-Br", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
            <Button variant="secondary" size="sm" className="bg-[#26272B]">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
