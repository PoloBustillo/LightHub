"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import AlternativeLinks from "@/components/AlternativeLinks";
import Nav from "@/components/Nav";

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

const NotFound = () => {
  const [step, setStep] = useState(0);
  //https://lottie.host/e88f4f6a-b477-4045-b491-9f703ce1306c/Ri8Tp3H5Jq.json

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
    <>
      <main>
        <div className="max-w-lg mx-auto text-gray-600">
          <motion.div
            className="text-center text-medium md:text-l pt-5 mb-[-4%]  font-semibold  dark:text-gray-400 "
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{
              delay: 0.2,
              duration: 4,
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
            <Player autoplay loop src={steps[step].animation} />
          </motion.div>
          <div className="space-y-3 text-center my-10">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Understand User Flow.
              <span className="sm:block"> Increase Conversion. </span>
            </h1>
          </div>
        </div>
        <AlternativeLinks></AlternativeLinks>
      </main>
    </>
  );
};

export default NotFound;
