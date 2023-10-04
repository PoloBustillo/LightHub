"use client";
import React from "react";

import { Input } from "@nextui-org/input";
import { Card } from "@nextui-org/card";
import { Spacer } from "@nextui-org/spacer";
import { Checkbox } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import lightHubApi from "@/api-config";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center h-screen  px-8 rounded-2xl  bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
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
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Email"
        />
        <Spacer y={2} />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Nombre"
        />
        <Spacer y={2} />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Password"
        />
        <Spacer y={3} />
        <Checkbox>Remember me</Checkbox>
        <Spacer y={3} />
        <Link href="/"> Forgot password?</Link>
        <Spacer y={1} />
        <Button
          color="secondary"
          className="my-4"
          onClick={async () => {
            const { data } = await lightHubApi.post("/user/create", {
              email: "email",
              password: "password",
            });
          }}
        >
          Crear cuenta
        </Button>
      </Card>
    </div>
  );
}
