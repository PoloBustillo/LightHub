"use client";
import React from "react";
import { Button } from "@nextui-org/button";
import lightHubApi from "@/api-config";

import { API_URL } from "@/utils/constants";
const page = () => {
  return (
    <div>
      <Button
        onClick={async () => {
          const response = await lightHubApi.delete(
            API_URL + "/user/delete/polo@test3.com"
          );
          console.log(response);
        }}
      >
        DELETE
      </Button>
    </div>
  );
};

export default page;
