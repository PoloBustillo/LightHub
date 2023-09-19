"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { useTheme } from "next-themes";

const NotFound = () => {
  const { theme } = useTheme();
  const [step, setStep] = useState(0);
  //https://lottie.host/e88f4f6a-b477-4045-b491-9f703ce1306c/Ri8Tp3H5Jq.json
  const steps = [
    // {
    //   id: 1,
    //   text: "EL EQUIPO ANDABA DE CAMPING",
    //   animation:
    //     "https://lottie.host/3b283dae-e0f1-4d66-a29f-e2c17698e779/CyppT2ni5Q.json",
    //   motion:
    //     theme == "dark"
    //       ? {
    //           initial: { opacity: 0, x: [0, 50, -50, 50, -50, 0] },
    //           animate: { opacity: 1, x: [50, -50, 50, -50, 0, 0] },
    //           exit: { opacity: 0, x: [0, 50, -50, 50, -50, 0] },
    //           transition: {
    //             duration: 4, // Adjust the duration as desired
    //             ease: "easeOut",
    //           },
    //         }
    //       : {
    //           initial: { opacity: 1 },
    //           animate: { opacity: 1 },
    //           exit: { opacity: 1 },
    //         },
    // },
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
      text: "YA NO TENEMOS EQUIPO",
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
      <div className="grid grid0-cols-2 gap-4">
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
            style={{ height: "50vh", width: "100%" }}
          />
        </motion.div>
        <h2 className="text-l md:text-xl  font-semibold  text-center dark:text-gray-400 ">
          RUTA NO ENCONTRADA
        </h2>
        <motion.span
          className="text-medium md:text-l  font-semibold  text-center dark:text-gray-400 "
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
        </motion.span>
      </div>
    </div>
  );
};

export default NotFound;
