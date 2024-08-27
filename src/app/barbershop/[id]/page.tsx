import { Header } from "@/app/_components/header";
import PhoneItem from "@/app/_components/phone-item";
import ServiceItem from "@/app/_components/services-item";
import SiderbarButton from "@/app/_components/siderbar-button";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import db from "@/app/_lib/prisma";
import {
  ChevronLeftIcon,
  LocateIcon,
  MapPinIcon,
  MenuIcon,
  StarIcon,
} from "lucide-react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../assets/Logo1.png";
import Search from "@/app/_components/search";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import Map from "../../../assets/map.svg";
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

  return (
    <>
      <div className="block md:hidden p-5 text-white">
        {/* IMAGEM */}
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
            className="absolute left-4 top-4 asChild bg-[#141518] rounded-xl  hover:bg-primary"
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
            <SiderbarButton />
          </Button>
        </div>

        {/* TITULO */}
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
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Sobre Nós
          </h2>
          <p className="text-justify text-sm">{barbershop?.description}</p>
        </div>

        {/* SERVIÇOS */}
        <div className="p-5 space-y-3 border-b border-solid bg-[#141518]">
          <h2 className="text-xs font-bold uppercase  text-gray-400">
            Serviços
          </h2>
          <div className="space-y-3">
            {barbershop?.services.map((service) => (
              <ServiceItem
                key={service.id}
                barbershop={barbershop}
                service={service}
              />
            ))}
          </div>
        </div>

        {/* CONTATO */}
        <div className="p-5 space-y-3 border-b border-solid bg-[#141518]">
          <h2 className="text-xs font-bold uppercase  text-gray-400">
            Contatos
          </h2>
          {barbershop?.phones.map((phone) => (
            <PhoneItem key={phone} phone={phone} />
          ))}
        </div>
      </div>

      <div className="max-md:hidden md:flex !important md:justify-between md:items-center md:flex-col gap-3">
        {/* Menu*/}
        <div className="w-full">
          <Card className="bg-secundary border-b-2  ">
            <CardContent className="flex flex-row items-center justify-between p-5 md:px-10">
              <div className="flex flex-row w-[80%]">
                <Link href="/">
                  <Image
                    src={Logo}
                    alt="Logo"
                    layout="intrinsic"
                    height={20}
                    width={280}
                  />
                </Link>
                <div className="w-[70%] px-10">
                  <Search />
                </div>
              </div>
              <SiderbarButton />
            </CardContent>
          </Card>
        </div>

        <div className="p-10 flex flex-row gap-5  ">
          {/* Div Esquerda */}
          <div className="w-[70%] h-auto">
            <div className="max-w-[100%]">
              <Image
                src={barbershop?.imageUrl as string | StaticImport}
                width={790}
                height={500}
                alt={barbershop?.name as string}
                className="object-cover w-full"
              />
            </div>

            {/*Infos Barber*/}
            <div className="mt-6 flex flex-row justify-between">
              <div className="flex flex-col gap-3">
                <h3 className="text-[30px] font-bold">{barbershop?.name}</h3>
                <div className="flex flex-row gap-2">
                  <MapPinIcon className="text-primary" size={18} />
                  <p>{barbershop?.address}</p>
                </div>
              </div>
              <div className="flex flex-row">
                <Card>
                  <CardContent className="flex flex-col justify-center items-center pt-[10px] px-[32px] gap-4">
                    <div className="flex flex-row items-center justify-center gap-2">
                      <StarIcon
                        className="fill-primary text-primary"
                        size={18}
                      />
                      {barbershop?.avaliation}
                    </div>
                    <div className="flex flex-row gap-2">
                      {barbershop?.totalRatings} <p>Avaliações</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* SERVIÇOS */}
            <div className="mt-[40px]">
              <h2 className="text-[14px] font-bold uppercase  text-gray-400">
                Serviços
              </h2>
              <div className="mt-[12px] grid grid-cols-2 gap-4">
                {barbershop?.services.map((service) => (
                  <ServiceItem
                    key={service.id}
                    barbershop={barbershop}
                    service={service}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Div Direita */}
          <div className="max-w-[30%]">
            {/*Maps*/}
            <div className="relative flex flex-col w-full">
              <Image height={290} src={Map} alt="map" />

              <div className="absolute top-[120px] h-[15%] w-full p-3">
                <Card className="w-full p-2 flex items-center">
                  <CardContent className="flex items-center">
                    <Avatar>
                      <AvatarImage src={barbershop?.imageUrl} />
                    </Avatar>
                    <div className="ml-5 flex flex-col gap-1">
                      <h2>{barbershop?.name}</h2>
                      <p>{barbershop?.address}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* DESCRIÇÃO */}
            <div className=" border-b border-solid py-6 space-y-2">
              <h2 className="text-xs font-bold uppercase text-gray-400">
                Sobre Nós
              </h2>
              <p className="text-justify text-sm">{barbershop?.description}</p>
            </div>

            {/* CONTATO */}
            <div className="py-6 space-y-3 border-b border-solid ">
              <h2 className="text-xs font-bold uppercase  text-gray-400">
                Contatos
              </h2>
              {barbershop?.phones.map((phone) => (
                <PhoneItem key={phone} phone={phone} />
              ))}
            </div>

            {/* Horario Funcionamento */}
            <div className=" border-b border-solid py-6 space-y-2">
              <div className="flex flex-row justify-between items-center">
                <p className="text-[14px] text-gray-400">Segunda-Feira</p>
                <p className="text-[14px]">Fechado</p>
              </div>
              <div className="flex flex-row justify-between items-center">
                <p className="text-[14px] text-gray-400">Terça-Feira</p>
                <p className="text-[14px]">09:00 - 21:00</p>
              </div>
              <div className="flex flex-row justify-between items-center">
                <p className="text-[14px] text-gray-400">Quarta-Feira</p>
                <p className="text-[14px]">09:00 - 21:00</p>
              </div>
              <div className="flex flex-row justify-between items-center">
                <p className="text-[14px] text-gray-400">Quinta-Feira</p>
                <p className="text-[14px]">09:00 - 21:00</p>
              </div>
              <div className="flex flex-row justify-between items-center">
                <p className="text-[14px] text-gray-400">Sexta-Feira</p>
                <p className="text-[14px]">09:00 - 21:00</p>
              </div>
              <div className="flex flex-row justify-between items-center">
                <p className="text-[14px] text-gray-400">Sábado</p>
                <p className="text-[14px]">09:00 - 21:00</p>
              </div>
              <div className="flex flex-row justify-between items-center">
                <p className="text-[14px] text-gray-400">Domingo</p>
                <p>Fechado</p>
              </div>
            </div>

            {/* Parceria */}
            <div className="border-b border-solid py-6 space-y-2 flex flex-row justify-between items-center">
              <p>Em parceria com</p>
              <Image src={Logo} alt="alt" width={200} height={50} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BarbershopPage;
