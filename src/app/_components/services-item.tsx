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
import { useState } from "react";
import { format, set, setMinutes } from "date-fns";
import { createBooking } from "../_actions/create-booking";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface props {
  service: BarbershopService;
  barbershop: Pick<Barbershop, "name">;
}

const ServiceItem = ({ service, barbershop }: props) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<String | undefined>(
    undefined,
  );

  const { data, status, update } = useSession();

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
        userId: "clzlzyhi10000t4jkanfw5d4u",
        date: newDate,
      });

      // Após a criação bem-sucedida, exiba a mensagem de sucesso
      toast.success("Reserva registrada com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar reserva!");
    }
  };

  function generateTimeList(
    startTime: number,
    endTime: number,
    intervalMinutes: number,
  ) {
    const times = [];
    let currentTime = startTime;

    while (currentTime <= endTime) {
      const hours = String(Math.floor(currentTime / 60)).padStart(2, "0");
      const minutes = String(currentTime % 60).padStart(2, "0");
      times.push(`${hours}:${minutes}`);
      currentTime += intervalMinutes;
    }

    return times;
  }

  const startTime = 8 * 60; // 08:00 in minutes
  const endTime = 17 * 60; // 17:00 in minutes
  const intervalMinutes = 45;

  const timeList = generateTimeList(startTime, endTime, intervalMinutes);

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

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm" className="bg-[#26272B]">
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent className="px-0">
                <SheetHeader>
                  <SheetTitle>Fazer Reserva</SheetTitle>
                </SheetHeader>

                <div className="border-b border-solid py-5">
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
                    {timeList.map((time) => (
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
                    <Card className="">
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
                <SheetFooter className="px-6">
                  <SheetClose asChild>
                    <Button onClick={handleCreatebooking}>Confirmar</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
