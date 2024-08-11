"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const formSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Digite algo para buscar!",
  }),
});

const Search = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/barbershop?title=${data.title}`);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex items-top justify-between gap-5"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-[100%] gap-1">
                <FormControl>
                  <Input
                    className=""
                    placeholder="Faça sua busca..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="flex items-center justify-center bg-[#8162FF] text-white rounded-xl hover:bg-[#644cc6]"
          >
            <SearchIcon className="" />
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Search;
