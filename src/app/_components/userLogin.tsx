"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { LogInIcon } from "lucide-react";
import Image from "next/image";
import Google from "../../assets/Google.svg";

const UserLogin = () => {
  const { data } = useSession();
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const getCurrentDate = () => {
      const today = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return today.toLocaleDateString("pt-BR", options);
    };

    setCurrentDate(getCurrentDate());
  }, []);

  const handleLoginWithGoogleClick = async () => {
    await signIn("google");
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold flex gap-3">
        Olá,{" "}
        {data?.user ? (
          data?.user?.name
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <p className="font-semibold cursor-pointer hover:text-primary">
                Faça seu Login
              </p>
            </DialogTrigger>
            <DialogContent className="w-[90%]">
              <DialogHeader>
                <DialogTitle>Faça Login na plataforma</DialogTitle>
                <DialogDescription>
                  Conecte-se usando sua conta do Google
                </DialogDescription>
              </DialogHeader>
              <Button
                onClick={handleLoginWithGoogleClick}
                className="flex gap-1 font-bold hover:bg-primary"
                variant="outline"
              >
                <Image
                  src={Google}
                  alt="fazer login com o Google"
                  width={18}
                  height={18}
                />
                Google
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </h2>
      <p>{currentDate}</p>
    </div>
  );
};

export default UserLogin;
