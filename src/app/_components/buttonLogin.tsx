"use client";

import { LogInIcon } from "lucide-react";
import { Header } from "./header";
import { Button } from "./ui/button";
import { Card, CardContent, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Google from "../../assets/Google.svg";

const ButtonLogin = () => {
  const handleLoginWithGoogleClick = async () => {
    await signIn("google");
  };

  return (
    <>
      <Header />
      <div className="flex p-5 gap-5 items-center justify-between">
        <Card className="w-full min-h-[150px] flex items-center">
          <CardContent className="w-full flex flex-row items-center justify-between">
            <CardTitle className="font-bold">Olá, faça seu login! </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
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
                    alt="fazer login com o Goole"
                    width={18}
                    height={18}
                  />
                  Google
                </Button>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ButtonLogin;
