import Footer from "@/app/_components/footer";
import ServiceItem from "@/app/_components/services-item";
import { Button } from "@/app/_components/ui/button";
import db from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface props {
  params: {
    id: string;
  };
}

const BarbershopPage = async ({ params }: props) => {
  const barbershop = await db?.barbershop.findFirst({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return notFound();
  }

  return (
    <>
      <div className="relative w-full h-[250px]">
        <Image
          src={barbershop?.imageUrl as string | StaticImport}
          fill
          alt={barbershop?.name as string}
          className="object-cover"
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4 asChild bg-[#141518] rounded-xl"
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4 asChild bg-[#141518] rounded-xl"
        >
          <Link href="">
            <MenuIcon />
          </Link>
        </Button>
      </div>

      <div className=" p-5 bg-[#141518] border-b border-solid">
        <h1 className="mb-6 text-xl font-bold">{barbershop?.name}</h1>
        <div className="mb-2 flex items-center gap-1">
          <MapPinIcon className="text-primary" size={18} />
          <p>{barbershop?.address}</p>
        </div>
        <div className="mb-2 flex items-center gap-1">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p>5,0 (889 avaliações)</p>
        </div>
      </div>

      {/* DESCRIÇÃO */}
      <div className="bg-[#141518] border-b border-solid p-5 space-y-2">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre Nós</h2>
        <p className="text-justify text-sm">{barbershop.description}</p>
      </div>

      <div className="p-5 space-y-3 bg-[#141518]">
        <h2 className="text-xs font-bold uppercase  text-gray-400">Serviços</h2>
        <div className="space-y-3">
          {barbershop.services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BarbershopPage;
