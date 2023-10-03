"use client";
import React from "react";

import { Input } from "@nextui-org/input";
import { Card } from "@nextui-org/card";
import { Spacer } from "@nextui-org/spacer";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { Checkbox } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";
import { Text } from "@nextui-org/react";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center h-screen  px-8 rounded-2xl  bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
      <Card className="m-5 p-10">
        LightHub
        <Input
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
        />
        <Spacer y={1} />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Password"
        />
        <Checkbox>Remember me</Checkbox>
        Forgot password?
        <Spacer y={1} />
        <Button>Sign in</Button>
      </Card>
    </div>
  );
}
