"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { Divider } from "@nextui-org/react";
import { useTheme } from "next-themes";

const navigations = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
        />
      </svg>
    ),
    title: "Recursos",
    desc: "Empieza creando tu proyecto para hacer tu sueños realidad.",
    href: "/",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
    title: "Guides",
    desc: "Lorem Ipsum is simply dummy text of the printing",
    href: "javascript:void(0)",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
    ),
    title: "Support",
    desc: "Lorem Ipsum is simply dummy text of the printing",
    href: "javascript:void(0)",
  },
];

const NotFound = () => {
  const [step, setStep] = useState(0);
  //https://lottie.host/e88f4f6a-b477-4045-b491-9f703ce1306c/Ri8Tp3H5Jq.json
  const steps = [
    {
      id: 1,
      text: "LOS ALIENS SI EXISTEN",
      animation:
        "https://lottie.host/791d6018-28b3-4277-a95a-45ffc9ef1dd1/TghamkiQlN.json",
      motion: {
        initial: { opacity: 0.2 },
        animate: { opacity: 1 },
        exit: { opacity: 0.2 },
        transition: {
          duration: 1,
          ease: "easeOut", // Adjust the duration as desired
        },
      },
    },
    {
      id: 2,
      text: "YA NO TENEMOS EQUIPO DE TRABAJO",
      animation:
        "https://lottie.host/e50d6c0b-1481-4f59-8046-6b10fc3f0856/5pX12q2O74.json",
      motion: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: {
          duration: 6, // Adjust the duration as desired
          ease: "easeOut",
        },
      },
    },
  ];

  const handleStepChange = () => {
    setStep((prevStep) => (prevStep + 1) % steps.length);
  };

  useEffect(() => {
    if (step < steps.length - 1) {
      const interval = setInterval(handleStepChange, 6000);
      return () => clearInterval(interval);
    }
  }, [handleStepChange, step]);

  return (
    <div className="h-[100%] ss:p-10 p-10 flex flex-col items-center justify-center ">
      <main>
        <div className="h-[100%] max-w-screen-xl mx-auto px-4 flex items-center justify-start md:px-8">
          <div className="max-w-lg mx-auto text-gray-600">
            <motion.div
              className="text-center text-medium md:text-l  font-semibold  dark:text-gray-400 "
              animate={{ opacity: 1, x: [-15, 15, 0] }}
              initial={{ opacity: 0, x: 0 }}
              transition={{
                delay: 0.2,
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              {steps[step].text}
            </motion.div>

            <motion.div
              className=" flex flex-col"
              key={steps[step].id} // Add a unique key to trigger motion animation on step change
              initial={steps[step].motion.initial}
              animate={steps[step].motion.animate}
              exit={steps[step].motion.exit}
              transition={steps[step].motion.transition}
            >
              <Player
                autoplay
                loop
                src={steps[step].animation}
                style={{ width: "100%" }}
              />
            </motion.div>
            <div className="space-y-3 text-center">
              <p className="text-gray-800 text-4xl font-semibold sm:text-5xl">
                Ruta NO Encontrada
              </p>
              <h3 className=" text-center text-indigo-600 font-semibold">
                404 Error
              </h3>
            </div>

            <div className="mt-3">
              <Divider></Divider>
              <ul className="divide-y ">
                {navigations.map((item, idx) => (
                  <li key={idx} className="flex gap-x-4 py-6">
                    <div className="flex-none w-14 h-14 bg-indigo-50 rounded-full text-indigo-600 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-gray-800 font-medium">
                        {item.title}
                      </h4>
                      <p>{item.desc}</p>
                      <a
                        href={item.href}
                        className="text-sm text-indigo-600 duration-150 hover:text-indigo-400 font-medium inline-flex items-center gap-x-1"
                      >
                        Llevame allá
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
