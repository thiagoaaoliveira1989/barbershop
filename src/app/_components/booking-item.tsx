"use client";

import { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { $Enums, BarbershopRating } from "@prisma/client";
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
import { toast } from "sonner";
import { updateAvaliationBarbershop } from "../_actions/update-bookingAvaliation";
import { deleteBooking } from "../_actions/delete-booking";
import { Decimal } from "@prisma/client/runtime/library";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import Image from "next/image";
import Map from "../../assets/map.svg";

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
      price: Decimal;
      barbershop: {
        id: string;
        name: string;
        imageUrl: string;
        address: string;
        phones: string[];
        ratings: {
          id: string;
          rating: number;
          comment: string | null;
          userId: string;
          barbershopId: string;
        }[];
      };
    };
    serviceId: string;
    confirmed: $Enums.BookingStatus;
  }[];
}

const BookingItem = ({ bookingList }: BookingProps) => {
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");

  const handleStarClick = (index: number) => {
    setSelectedStars(index + 1);
  };

  const handleSubmitAvaliation = async (id: string) => {
    if (!selectedStars) return;

    try {
      await updateAvaliationBarbershop(id, selectedStars, comment);

      // Exibir toast de sucesso
      toast.success("Avaliação salva com sucesso!");
    } catch (error) {
      // Registrar o erro no console
      console.error("Erro ao salvar a avaliação:", error);

      // Exibir toast de erro
      toast.error("Erro ao salvar a avaliação. Tente novamente.");
    }
  };

  const handleCancelBooking = async (id: string) => {
    try {
      await deleteBooking(id);
      toast.success("Reserva excluída com sucesso!");

      // Recarregar a página após o cancelamento
      window.location.reload();
    } catch (error) {
      console.error("Erro ao deletar a Reserva:", error);
      toast.error("Erro ao deletar a Reserva. Tente novamente.");
    }
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
              <SheetContent className="flex flex-col h-full min-w-[90%] overflow-auto">
                <SheetHeader className="border-b border-solid p-5">
                  <SheetTitle className="text-left">
                    Informações da Reserva
                  </SheetTitle>
                </SheetHeader>

                <div className="relative flex flex-col w-full mt-6">
                  <Image height={290} src={Map} alt="map" />

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
                  {booking.service.barbershop?.phones.map((contact, index) => (
                    <PhoneItem key={`${contact}-${index}`} phone={contact} />
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
                      {booking.confirmed === BookingStatus.COMPLETED ? (
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader className="flex fles-col gap-3">
                            <DialogTitle>Avalie sua experiência</DialogTitle>
                            <DialogDescription>
                              Toque nas estrelas para avaliar sua experiência na{" "}
                              {booking.service.barbershop.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex flex-col gap-4 py-4">
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
                            <div className="flex flex-col items-start gap-3 justify-start">
                              <Label>Comentário</Label>
                              <Textarea
                                className="mt-3"
                                title="comment"
                                placeholder="Deixe um comentário sobre a loja."
                                value={comment} // Bind o valor do estado ao Textarea
                                onChange={(e) => setComment(e.target.value)} // Atualiza o estado com o valor do Textarea
                              />
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
                            <SheetClose asChild>
                              <Button
                                className={`w-full ${!selectedStars ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={() => {
                                  handleSubmitAvaliation(
                                    booking.service.barbershop.id,
                                  );
                                  setSelectedStars(null);
                                }}
                                disabled={!selectedStars}
                              >
                                Confirmar
                              </Button>
                            </SheetClose>
                          </DialogFooter>
                        </DialogContent>
                      ) : (
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader className="flex fles-col gap-3">
                            <DialogTitle>Cancelar Reserva</DialogTitle>
                            <DialogDescription>
                              Você confirma o cancelamento do Agendamento?
                            </DialogDescription>
                          </DialogHeader>

                          <DialogFooter className="flex flex-row gap-4 w-full items-center justify-between">
                            <div className="flex w-full gap-5">
                              <SheetClose asChild className="w-full">
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
                              <SheetClose className="w-full">
                                <Button
                                  variant="destructive"
                                  className={`w-full`}
                                  onClick={() =>
                                    handleCancelBooking(booking.id)
                                  }
                                >
                                  Confirmar
                                </Button>
                              </SheetClose>
                            </div>
                          </DialogFooter>
                        </DialogContent>
                      )}
                    </Dialog>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        ))
      ) : (
        <div className="flex flex-col gap-3">
          <h2 className="mt-6 text-sm">
            Você ainda não possui Agendamentos Confirmados!
          </h2>
          <Link href="/bookings">
            <Button className="bg-[#8162FF] text-white">
              Verificar Agendamentos
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default BookingItem;
