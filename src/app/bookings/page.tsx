import { getServerSession } from "next-auth";
import { Header } from "../_components/header";
import { authOptions } from "../_lib/auth";
import { getBookings } from "../_actions/get-bookings";
import BookingItem from "../_components/booking-item";
import { signIn } from "next-auth/react";
import ButtonLogin from "../_components/buttonLogin";
import { Card, CardContent } from "../_components/ui/card";
import Link from "next/link";
import Image from "next/image";
import Search from "../_components/search";
import SiderbarButton from "../_components/siderbar-button";
import Logo from "../../assets/Logo1.png";

enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
}

const Bookings = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return <ButtonLogin />;
  }

  const userId = session.user.id;
  const bookingList = await getBookings(userId);

  const bookingsPending = bookingList.filter(
    (booking) => booking.confirmed === BookingStatus.PENDING,
  );

  const bookingsConfirmed = bookingList.filter(
    (booking) => booking.confirmed === BookingStatus.CONFIRMED,
  );

  const bookingsCompleted = bookingList.filter(
    (booking) => booking.confirmed === BookingStatus.COMPLETED,
  );

  return (
    <>
      <div className="block md:hidden p-5 text-white">
        <Header />
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {bookingsPending.length > 0 && (
          <>
            <h2 className="text-lg mt-5 text-gray-400">
              Agendamentos Pendentes
            </h2>
            <BookingItem bookingList={bookingsPending} />
          </>
        )}

        {bookingsConfirmed.length > 0 && (
          <>
            <h2 className="text-lg mt-5 text-gray-400">
              Agendamentos Confirmados
            </h2>
            <BookingItem bookingList={bookingsConfirmed} />
          </>
        )}

        {bookingsCompleted.length > 0 && (
          <>
            <h2 className="text-lg mt-5 text-gray-400">
              Agendamentos Completados
            </h2>
            <BookingItem bookingList={bookingsCompleted} />
          </>
        )}
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

        <div className="mt-[40px]">
          <h1 className="text-xl font-bold">Agendamentos</h1>

          {bookingsPending.length > 0 && (
            <>
              <h2 className="text-lg mt-5 text-gray-400">
                Agendamentos Pendentes
              </h2>
              <div className="grid grid-cols-3 gap-5">
                <BookingItem bookingList={bookingsPending} />
              </div>
            </>
          )}

          {bookingsConfirmed.length > 0 && (
            <>
              <h2 className="text-lg mt-5 text-gray-400">
                Agendamentos Confirmados
              </h2>
              <div className="grid grid-cols-3 gap-5">
                <BookingItem bookingList={bookingsConfirmed} />
              </div>
            </>
          )}

          {bookingsCompleted.length > 0 && (
            <>
              <h2 className="text-lg mt-5 text-gray-400">
                Agendamentos Finalizados
              </h2>
              <div className="grid grid-cols-3 gap-5">
                <BookingItem bookingList={bookingsCompleted} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Bookings;
