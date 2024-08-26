import { getServerSession } from "next-auth";
import { Header } from "../_components/header";
import { authOptions } from "../_lib/auth";
import { getBookings } from "../_actions/get-bookings";
import BookingItem from "../_components/booking-item";
import { signIn } from "next-auth/react";
import ButtonLogin from "../_components/buttonLogin";

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
      <Header />
      <div className="p-5">
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
    </>
  );
};

export default Bookings;
