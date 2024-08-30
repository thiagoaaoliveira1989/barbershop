import Image from "next/image";
import { Card, CardContent } from "./ui/card";

import Logo from "../../assets/Logo1.png";
import SiderbarButton from "./siderbar-button";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="w-full">
      <Card className="bg-gray-950 border-none  p-0 ">
        <CardContent className="flex flex-row items-center justify-between p-5 md:px-10">
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo"
              layout="intrinsic"
              height={20}
              width={280}
            />
          </Link>
          <SiderbarButton />
        </CardContent>
      </Card>
    </div>
  );
};
