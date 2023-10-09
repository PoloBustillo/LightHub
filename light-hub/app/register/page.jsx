"use client";
import React, { useEffect, useState } from "react";

import { getProviders, signIn, useSession } from "next-auth/react";
import { Input } from "@nextui-org/input";
import { Card } from "@nextui-org/card";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import lightHubApi from "@/api-config";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

import { registrationSchema } from "@/utils/validations";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registrationSchema) });
  const router = useRouter();
  const [data, setData] = useState("");
  const [providers, setProviders] = useState("");
  const { data: session } = useSession();
  console.log("ERRORS", errors);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
      if (session?.user?.email) {
        router.push("/");
      }
    })();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    setData(JSON.stringify(data));
    const response = await lightHubApi.post("/user/create", data);
    if (response.status === 201) {
      signIn(undefined, { callbackUrl: "/" });
    }
    console.log("RESPONSE", response);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-center h-screen  px-8 rounded-2xl  bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
      >
        <Card className="m-5 p-10">
          <span className="font-title text-center mb-3">LightHub</span>
          {/* <Input
          label="Search"
          isClearable
          radius="lg"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focused=true]:bg-default-200/50",
              "dark:group-data-[focused=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="Type to search..."
          startContent={
            <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        /> */}
          <Input
            {...register("email")}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
          />
          <Spacer y={2} />
          <Input
            {...register("name")}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Nombre"
          />
          <Spacer y={2} />
          <Input
            {...register("password")}
            type="password"
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
          />
          <Spacer y={3} />
          <Input
            {...register("confirmPassword")}
            type="password"
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Confirmar Password"
          />
          <Spacer y={3} />
          <Spacer y={1} />
          <Button color="secondary" type="submit" className="my-4">
            Crear cuenta
          </Button>
          <div className="text-center">
            {Object.values(providers).map((provider) => {
              return provider.type === "oauth" ? (
                <div key={provider.name} className="my-3">
                  <Button
                    color="primary"
                    onClick={async () => {
                      const data = await signIn(provider.id, {
                        redirect: false,
                        callbackUrl: "/secure/mis-proyectos",
                      });
                    }}
                  >
                    Entra con {provider.name}
                  </Button>
                </div>
              ) : (
                <></>
              );
            })}
          </div>
        </Card>
      </form>
    </>
  );
}
