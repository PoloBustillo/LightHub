"use client";
import React from "react";
import { Button } from "@nextui-org/button";
import lightHubApi from "@/api-config";
const page = () => {
  return (
    <div>
      <Button
        onClick={async () => {
          const response = await lightHubApi.delete("/user/delete", {
            data: { email: "asdkskad@adldlas.com" },
          });
          console.log(response);
        }}
      >
        DELETE
      </Button>
    </div>
  );
};

export default page;
