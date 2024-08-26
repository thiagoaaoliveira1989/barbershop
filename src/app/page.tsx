import Image from "next/image";
import { Header } from "./_components/header";
import { Button } from "./_components/ui/button";
import Banner from "../assets/Banner.png";
import Banner2 from "../assets/banner2.jpg";
import { BarbershopItem } from "./_components/barbershop-items";
import { quickSearchOption } from "./_constants/search";
import db from "../app/_lib/prisma";
import UserLogin from "./_components/userLogin";
import Search from "./_components/search";
import Link from "next/link";
import { getBookings } from "./_actions/get-bookings";
import { getServerSession } from "next-auth";
import { BookingStatus } from "@prisma/client";
import { authOptions } from "./_lib/auth";
import BookingItem from "./_components/booking-item";

const Home = async () => {
  const barbershops = await db.barbershop.findMany({});
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  const session = await getServerSession(authOptions);

  const userId = session?.user.id;
  const bookingList = await getBookings(userId);

  const bookingsConfirmed = bookingList.filter(
    (booking) => booking.confirmed === BookingStatus.CONFIRMED,
  );

  return (
    <div className="">
      {/*header*/}
      <Header />

      <div className="block md:hidden p-5 text-white">
        <UserLogin />

        {/*BUSCA*/}
        <div className="mt-6">
          <Search />
        </div>

        {/*BUTTONS*/}
        <div className="flex items-center justify-between mt-6 overflow-y-auto gap-4 [&::-webkit-scrollbar]:hidden">
          {quickSearchOption.map((quick) => (
            <Link key={quick.title} href={`/barbershop?service=${quick.title}`}>
              <Button className="flex gap-2 rounded-xl bg-[#26272B] hover:bg-gray-800">
                <Image src={quick.imageUrl} height={20} alt={quick.title} />
                <p>{quick.title}</p>
              </Button>
            </Link>
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
        <BookingItem bookingList={bookingsConfirmed} />

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

      <div className="max-md:hidden md:flex !important md:justify-between md:items-center gap-3">
        <div className="relative h-[150px] w-full">
          <Image
            src={Banner2}
            alt="banner"
            className="object-cover opacity-25 w-full h-[390px]"
          />
        </div>
        <div className="absolute top-[100px] p-5 flex gap-[100px]">
          <div className="w-[439px] h-[335px] flex flex-col gap-9">
            {/*Login*/}
            <UserLogin />

            {/*BUSCA*/}
            <Search />
          </div>

          {/*RECOMENDADOS*/}
          <div className="max-w-[910px]">
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
        </div>
      </div>
    </div>
  );
};

export default Home;
