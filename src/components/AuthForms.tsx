"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoginForm } from "@/app/(pages)/login/LoginForm";
import { ResetForm } from "@/app/(pages)/login/ResetPassword";

export default function AuthForms() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? "login" : "create"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          {isLogin ? (
            <LoginForm onSwitch={toggleForm} />
          ) : (
            <ResetForm onSwitch={toggleForm} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
