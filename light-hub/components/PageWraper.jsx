"use client";
import { AnimatePresence, delay, motion } from "framer-motion";
import React from "react";

const PageWraper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 25 }}
      transition={{ delay: 0.25 }}
    >
      {children}
    </motion.div>
  );
};

export default PageWraper;
