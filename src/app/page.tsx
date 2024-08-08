import Image from "next/image";
import { Header } from "./_components/header";
import { Input } from "./_components/ui/input";
import { Button } from "./_components/ui/button";
import { SearchIcon } from "lucide-react";
import Banner from "../assets/Banner.png";
import { BarbershopItem } from "./_components/barbershop-items";
import Footer from "./_components/footer";
import { quickSearchOption } from "./_constants/search";
import { Booking } from "./_components/booking";
import db from "../app/_lib/prisma";

const Home = async () => {
  const barbershops = await db.barbershop.findMany({});
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  // TODO - receber agendamento como prop
  return (
    <div className="">
      {/*header*/}
      <Header />

      <div className="p-5 text-white">
        <h2 className="text-xl font-bold">Olá, Thiago</h2>
        <p>Segunda-Feira, 05 de Agosto</p>

        {/*BUSCA*/}
        <div className="mt-6 flex items-center justify-between gap-4 ">
          <Input placeholder="Search" className="rounded-xl bg-[#26272B]" />
          <Button className="bg-[#8162FF] text-white rounded-xl hover:bg-[#644cc6]">
            <SearchIcon className="" />
          </Button>
        </div>

        {/*BUTTONS*/}
        <div className="flex items-center justify-between mt-6 overflow-y-auto gap-4 [&::-webkit-scrollbar]:hidden">
          {quickSearchOption.map((quick) => (
            <Button
              key={quick.title}
              className="flex gap-2 rounded-xl bg-[#26272B] hover:bg-gray-800"
            >
              <Image src={quick.imageUrl} height={20} alt={quick.title} />
              <p>{quick.title}</p>
            </Button>
          ))}
        </div>

        {/*BANNER*/}
        <div className="relative h-[150px] w-full mt-6">
          <Image
            src={Banner}
            alt="Agende nos melhores barbeiros da cidade"
            fill
            className="object-cover w-full"
          />
        </div>

        {/*AGENDAMENTO*/}
        <Booking />

        {/*RECOMENDADOS*/}
        <div className="mt-6">
          <h3>Recomendados</h3>
          <div className="flex overflow-y-auto gap-4 [&::-webkit-scrollbar]:hidden">
            {barbershops ? (
              barbershops.map((barber) => (
                <BarbershopItem key={barber.id} barber={barber} />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>

        {/*POPULARES*/}
        <div className="mt-6">
          <h3>Populares</h3>
          <div className="flex overflow-y-auto gap-4 [&::-webkit-scrollbar]:hidden">
            {popularBarbershops ? (
              popularBarbershops.map((barber) => (
                <BarbershopItem key={barber.id} barber={barber} />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
