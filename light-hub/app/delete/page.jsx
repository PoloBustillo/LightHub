"use client";
import React from "react";
import { Button } from "@nextui-org/button";

import { API_URL } from "@/utils/constants";
import axios from "axios";

const page = () => {
  return (
    <div>
      <Button
        onClick={async () => {
          const response = await axios.delete(API_URL + "/user/delete");
        }}
      >
        DELETE
      </Button>
      <Button
        color="primary"
        onClick={async () => {
          const response = await axios.put(API_URL + "/user/update", {
            name: "UpdatedName",
          });
        }}
      >
        Update
      </Button>
    </div>
  );
};

export default page;
