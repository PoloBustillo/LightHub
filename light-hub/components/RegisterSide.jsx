import React, { useEffect, useState } from "react";
import axios from "axios";
import LightHouse from "./icons/LightHub";
const RegisterSide = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      let users = await axios.get(
        "https://randomuser.me/api/?results=6&inc=picture&noinfo"
      );
      setUsers(users?.data?.results);
    })();
  }, []);
  return (
    <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
      <div className="relative z-10 w-full max-w-md">
        <div className="justify-center w-full flex">
          <LightHouse />
        </div>
        <div className=" mt-10 space-y-3">
          <h3 className="text-white text-3xl font-bold">
            Una comunidad para alcanzar tus metas
          </h3>

          <p className="text-gray-300 pb-6">
            Crea una cuenta y ten acceso ilimitado y gratuito a la red más
            grande para la construcción de proyectos colaborativos.
          </p>
          <div className="flex items-center -space-x-2 overflow-hidden">
            <img
              src={users[0]?.picture.thumbnail}
              className="w-10 h-10 rounded-full border-2 border-green-200"
            />
            <img
              src={users[1]?.picture.thumbnail}
              className="w-10 h-10 rounded-full border-2 border-green-300"
            />
            <img
              src={users[2]?.picture.thumbnail}
              className="w-10 h-10 rounded-full border-2 border-green-400"
            />
            <img
              src={users[3]?.picture.thumbnail}
              className="w-10 h-10 rounded-full border-2 border-green-500"
            />
            <img
              src={users[4]?.picture.thumbnail}
              className="w-10 h-10 rounded-full border-2 border-green-600"
            />
            <p className="text-sm text-gray-400 font-medium translate-x-5">
              Más de <span className="user-count"></span>+ usuarios
            </p>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 my-auto h-[500px]"
        style={{
          background:
            "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
          filter: "blur(118px)",
        }}
      ></div>
    </div>
  );
};

export default RegisterSide;
