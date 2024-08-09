"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold">Olá, {data?.user?.name}</h2>
      <p>{currentDate}</p>
    </div>
  );
};

export default UserLogin;
