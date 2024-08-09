import Image from "next/image";
import { Card, CardContent } from "./ui/card";

import Logo from "../../assets/Logo.png";
import SiderbarButton from "./siderbar-button";

export const Header = () => {
  return (
    <Card className="bg-gray-950 border-none  ">
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image
          src={Logo}
          alt="Logo"
          layout="intrinsic"
          height={18}
          width={120}
        />

        <SiderbarButton />
      </CardContent>
    </Card>
  );
};
