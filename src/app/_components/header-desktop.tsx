import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Search from "./search";
import SiderbarButton from "./siderbar-button";
import Logo from "../../assets/Logo1.png";

const HeaderDesktop = () => {
  return (
    <>
      {/* Menu*/}
      <div className="w-full">
        <Card className="bg-secundary border-b-2  ">
          <CardContent className="flex flex-row items-center justify-between p-5 md:px-10">
            <div className="flex flex-row w-[80%]">
              <Link href="/">
                <Image
                  src={Logo}
                  alt="Logo"
                  layout="intrinsic"
                  height={20}
                  width={280}
                />
              </Link>
              <div className="w-[70%] px-10">
                <Search />
              </div>
            </div>
            <SiderbarButton />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default HeaderDesktop;
