"use client";

import { useState } from "react";
import type React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export function ResetForm({
  onSwitch,
  className,
  ...props
}: { onSwitch?: () => void } & React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  // Validação de email
  function isValidEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(value.length > 0 && !isValidEmail(value));
  };

  return (
    <div className="w-full rounded-2xl bg-white p-8 shadow-2xl">
      <form className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-800 my-6">
            Recupere sua conta
          </h1>
          <p className="text-sm text-gray-500 my-4">
            Preencha os campos abaixo.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Email */}
          <div className="relative">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              className={cn(
                "text-gray-600 placeholder:text-gray-400 placeholder:text-base rounded-4xl py-6 border transition",
                emailError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
              )}
              placeholder="Email"
            />
            <Mail className="absolute left-88 top-4 h-5 w-5 text-gray-400" />
            {emailError && (
              <p className="mt-1 text-sm text-red-500">Email inválido</p>
            )}
          </div>

          {/* Botão */}
          <Button
            type="submit"
            className="w-full rounded-4xl py-6 bg-blue-800 text-white hover:bg-blue-900 transform hover:scale-105 transition duration-500"
            disabled={emailError}
          >
            Recuperar
          </Button>
        </div>
        <div className="flex justify-center">
          <p className="text-gray-800">
            <button
              type="button"
              onClick={onSwitch}
              className="text-sm font-medium text-blue-800 hover:underline"
            >
              Voltar
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
