"use client";

import { Barbershop, BarbershopService } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { format, set } from "date-fns";
import { createBooking } from "../_actions/create-booking";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { getBookings } from "../_actions/get-bookings";

interface props {
  service: BarbershopService;
  barbershop: Pick<Barbershop, "name">;
}

const ServiceItem = ({ service, barbershop }: props) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const { data } = useSession();

  const handleDateSelected = (date: Date | undefined) => {
    setSelectedDay(date);
  };

  const handleTimeSelected = (time: string | undefined) => {
    setSelectedTime(time);
  };

  const handleCreatebooking = async () => {
    if (!selectedDay || !selectedTime || !data) return;

    const hour = selectedTime.split(":")[0];
    const minute = selectedTime.split(":")[1];

    const newDate = set(selectedDay, {
      minutes: Number(minute),
      hours: Number(hour),
    });

    try {
      await createBooking({
        serviceId: service.id,
        userId: data.user.id as string,
        date: newDate,
      });

      // Após a criação bem-sucedida, exiba a mensagem de sucesso
      toast.success("Reserva registrada com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar reserva!");
    }
  };

  const generateTimeList = (
    startTime: number,
    endTime: number,
    intervalMinutes: number,
  ): string[] => {
    const times = [];
    let currentTime = startTime;

    while (currentTime <= endTime) {
      const hours = String(Math.floor(currentTime / 60)).padStart(2, "0");
      const minutes = String(currentTime % 60).padStart(2, "0");
      times.push(`${hours}:${minutes}`);
      currentTime += intervalMinutes;
    }

    return times;
  };

  const fetchAvailableTimes = async (selectedDay: Date) => {
    const listBookings = await getBookings();

    const reservedTimesByDay = listBookings.map((booking) => {
      const localDate = new Date(booking.date);
      localDate.setHours(localDate.getUTCHours() - 3);

      const date = localDate.toISOString().split("T")[0];
      const time = localDate.toTimeString().split(" ")[0].substring(0, 5);

      return { date, time };
    });

    const selectedDayString = selectedDay.toISOString().split("T")[0];

    const reservedTimes = reservedTimesByDay
      .filter((booking) => booking.date === selectedDayString)
      .map((booking) => booking.time);

    const startTime = 8 * 60; // 08:00 in minutes
    const endTime = 17 * 60; // 17:00 in minutes
    const intervalMinutes = 45;

    const timeList = generateTimeList(startTime, endTime, intervalMinutes);
    const availableTimes = timeList.filter(
      (time) => !reservedTimes.includes(time),
    );

    setAvailableTimes(availableTimes);
  };

  useEffect(() => {
    if (selectedDay) {
      fetchAvailableTimes(selectedDay);
    }
  }, [selectedDay]);

  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        <div className="relative min-h-[110px] min-w-[110px] max-w-[110px] max-h-[110px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="object-cover rounded-lg"
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

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm" className="bg-[#26272B]">
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent className="px-0 w-full h-full overflow-y-auto">
                <SheetHeader className="w-full flex items-center justify-center">
                  <SheetTitle>Fazer Reserva</SheetTitle>
                </SheetHeader>

                <div className="border-b border-solid py-5 w-full">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDateSelected}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                  />
                </div>

                {selectedDay && (
                  <div className="flex p-5 border-b border-solid overflow-x-auto [&::-webkit-scrollbar]:hidden gap-3">
                    {availableTimes.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="rounded-full"
                        onClick={() => handleTimeSelected(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}

                {selectedTime && selectedDay && (
                  <div className="p-5">
                    <Card>
                      <CardContent className="p-3 space-y-3">
                        <div className="flex justify-between items-center">
                          <h2 className="font-bold">{service.name}</h2>
                          <p className="text-sm font-bold">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </p>
                        </div>

                        <div className="flex justify-between items-center">
                          <h2 className="text-sm text-gray-400">Data</h2>
                          <p className="text-sm">
                            {format(selectedDay, "d 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>

                        <div className="flex justify-between items-center">
                          <h2 className="text-sm text-gray-400">Horário</h2>
                          <p className="text-sm">{selectedTime}</p>
                        </div>

                        <div className="flex justify-between items-center">
                          <h2 className="text-sm text-gray-400">Barbearia</h2>
                          <p className="text-sm">{barbershop.name}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {selectedTime && selectedDay && (
                  <SheetFooter className="px-6 mb-5 ">
                    <SheetClose asChild>
                      <Button className="w-full" onClick={handleCreatebooking}>
                        Confirmar
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
