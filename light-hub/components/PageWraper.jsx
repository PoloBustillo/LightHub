"use client";
import { AnimatePresence, motion } from "framer-motion";

import React from "react";
import { usePathname } from "next/navigation";

const PageWraper = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {children}
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-slate-900 dark:bg-slate-500 origin-bottom z-50"
          intial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          key={pathname}
        ></motion.div>
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-slate-900 dark:bg-slate-500 origin-top z-50"
          intial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          key={pathname}
        ></motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageWraper;
