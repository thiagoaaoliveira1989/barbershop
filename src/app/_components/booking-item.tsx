"use client";

import { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { $Enums } from "@prisma/client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import PhoneItem from "./phone-item";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { StarIcon } from "lucide-react";

enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
}

interface BookingProps {
  bookingList: {
    id: string;
    userId: string;
    updatedAt: Date;
    createdAt: Date;
    date: Date;
    service: {
      name: string;
      price: string;
      barbershop: {
        name: string;
        imageUrl: string;
        address: string;
        phones: string[];
      };
    };
    serviceId: string;
    confirmed: $Enums.BookingStatus;
  }[];
}

const BookingItem = ({ bookingList }: BookingProps) => {
  const [selectedStars, setSelectedStars] = useState<number | null>(null);

  const handleStarClick = (index: number) => {
    setSelectedStars(index + 1);
  };

  const handleSubmit = async () => {
    console.log("Estrelas selecionadas:", selectedStars);

    const newTotalRatings = barbershop.totalRatings + 1;
    const newAvaliation =
      (barbershop.avaliation * barbershop.totalRatings + novaAvaliacao) /
      newTotalRatings;
  };

  return (
    <>
      {bookingList.length > 0 ? (
        bookingList.map((booking) => (
          <div key={booking.id}>
            <Sheet>
              <SheetTrigger asChild>
                <div className="mt-6 cursor-pointer">
                  <Card className="mt-3 rounded-xl bg-[#26272B]">
                    <CardContent className="flex justify-between p-0">
                      <div className="flex flex-col gap-2 py-5 pl-5">
                        <Badge className="flex items-center justify-center px-2 py-1 max-w-[100px] bg-[#221C3D] font-medium text-[#8162FF] hover:bg-[#372d63]">
                          {booking.confirmed === BookingStatus.PENDING
                            ? "Pendente"
                            : booking.confirmed === BookingStatus.CONFIRMED
                              ? "Confirmado"
                              : "Finalizado"}
                        </Badge>
                        <h3 className="font-semibold">
                          {booking.service.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-[24px] w-[24px]">
                            <AvatarImage
                              src={
                                booking.service.barbershop.imageUrl ||
                                "default-avatar-url"
                              }
                            />
                          </Avatar>
                          <p>{booking.service.barbershop.name}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 p-5 justify-center items-center min-h-full rounded-r-xl border-l border-gray-600">
                        <p className="text-sm">
                          {format(booking.date, "MMMM", { locale: ptBR })}
                        </p>
                        <p className="text-2xl">{format(booking.date, "dd")}</p>
                        <p className="text-sm">
                          {format(booking.date, "HH:mm", { locale: ptBR })}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </SheetTrigger>
              <SheetContent className="flex flex-col h-full min-w-[90%]">
                <SheetHeader className="border-b border-solid p-5">
                  <SheetTitle className="text-left">
                    Informações da Reserva
                  </SheetTitle>
                </SheetHeader>

                <div className="relative flex flex-col w-full mt-6">
                  <iframe
                    allowFullScreen
                    height={290}
                    src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Pastelaria+do+Joao"
                    loading="lazy"
                  ></iframe>

                  <div className="absolute top-[120px] h-[15%] w-full p-3">
                    <Card className="w-full p-2 flex items-center">
                      <CardContent className="flex items-center">
                        <Avatar>
                          <AvatarImage
                            src={booking.service.barbershop.imageUrl}
                          />
                        </Avatar>
                        <div className="ml-5 flex flex-col gap-1">
                          <h2>{booking.service.barbershop.name}</h2>
                          <p>{booking.service.barbershop.address}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="p-5 mt-5 flex flex-col gap-4 border-b border-solid">
                    <Badge className="flex items-center justify-center px-2 py-1 max-w-[100px] bg-[#221C3D] text-[#8162FF] hover:bg-[#372d63]">
                      {booking.confirmed === BookingStatus.PENDING
                        ? "Pendente"
                        : booking.confirmed === BookingStatus.CONFIRMED
                          ? "Confirmado"
                          : "Finalizado"}
                    </Badge>

                    <Card>
                      <CardContent className="p-3 space-y-3">
                        <div className="flex justify-between items-center">
                          <h2 className="font-bold">{booking.service.name}</h2>
                          <p className="text-sm font-bold">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(booking.service.price))}
                          </p>
                        </div>

                        <div className="flex justify-between items-center">
                          <h2 className="text-sm text-gray-400">Data</h2>
                          <p className="text-sm">
                            {format(booking.date, "dd 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>

                        <div className="flex justify-between items-center">
                          <h2 className="text-sm text-gray-400">Horário</h2>
                          <p className="text-sm">
                            {format(booking.date, "HH:mm")}
                          </p>
                        </div>

                        <div className="flex justify-between items-center">
                          <h2 className="text-sm text-gray-400">Barbearia</h2>
                          <p className="text-sm">
                            {booking.service.barbershop.name}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="p-5 mt-5 flex flex-col gap-4 border-b border-solid">
                  {booking.service.barbershop?.phones.map((phone) => (
                    <PhoneItem key={phone} phone={phone} />
                  ))}
                </div>

                <div className="flex flex-col flex-grow">
                  <div className="flex flex-row gap-4 mt-auto">
                    <SheetClose asChild>
                      <Button variant="secondary" className="w-[50%]">
                        Voltar
                      </Button>
                    </SheetClose>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className={
                            booking.confirmed === BookingStatus.COMPLETED
                              ? "bg-primary w-[50%]"
                              : "bg-red-500 w-[50%]"
                          }
                        >
                          {booking.confirmed === BookingStatus.COMPLETED
                            ? "Avaliar"
                            : "Cancelar Reserva"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Avalie sua experiência</DialogTitle>
                          <DialogDescription>
                            Toque nas estrelas para avaliar sua experiência na{" "}
                            {booking.service.barbershop.name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="flex items-center gap-2 justify-center">
                            {[...Array(6)].map((_, index) => (
                              <StarIcon
                                key={index}
                                className={`w-6 h-6 cursor-pointer ${
                                  index < (selectedStars ?? 0)
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                }`}
                                onClick={() => handleStarClick(index)}
                              />
                            ))}
                          </div>
                        </div>
                        <DialogFooter className="flex flex-row gap-4 w-full items-center justify-between">
                          <SheetClose asChild>
                            <Button
                              variant="secondary"
                              className="w-full"
                              onClick={() => {
                                setSelectedStars(null);
                              }}
                            >
                              Cancelar
                            </Button>
                          </SheetClose>
                          <Button
                            className={`w-full ${!selectedStars ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={handleSubmit}
                            disabled={!selectedStars}
                          >
                            Confirmar
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        ))
      ) : (
        <div className="flex flex-col gap-3">
          <h2 className="mt-6 text-sm">Você ainda não possui Agendamentos!</h2>
          <Link href="/">
            <Button className="bg-[#8162FF] text-white">Agendar Agora</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default BookingItem;
