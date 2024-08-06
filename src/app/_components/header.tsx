import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Logo from "../../assets/Logo.png";

export const Header = () => {
  return (
    <Card className="bg-gray-950 border-none ">
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image
          src={Logo}
          alt="Logo"
          layout="intrinsic"
          height={18}
          width={120}
        />
        <Button size="icon" variant="outline" className="ml-4">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  );
};
