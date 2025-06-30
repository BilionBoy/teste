"use client";

import type React from "react";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock, Unlock } from "lucide-react";

export function LoginForm({
  onSwitch,
  className,
  ...props
}: { onSwitch?: () => void } & React.ComponentProps<"form">) {
  const [cpf, setCpf] = useState("");
  const [cpfError, setCpfError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Máscara de CPF
  function formatCPF(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  // Validação de CPF
  function isValidCPF(cpf: string) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += Number.parseInt(cpf[i]) * (10 - i);
    let firstDigit = (sum * 10) % 11;
    if (firstDigit === 10 || firstDigit === 11) firstDigit = 0;
    if (firstDigit !== Number.parseInt(cpf[9])) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) sum += Number.parseInt(cpf[i]) * (11 - i);
    let secondDigit = (sum * 10) % 11;
    if (secondDigit === 10 || secondDigit === 11) secondDigit = 0;
    return secondDigit === Number.parseInt(cpf[10]);
  }

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    const limitedValue = rawValue.slice(0, 11); // Limita a 11 dígitos
    const formatted = formatCPF(limitedValue);

    setCpf(formatted);

    if (limitedValue.length === 11) {
      setCpfError(!isValidCPF(limitedValue));
    } else {
      setCpfError(false);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-white p-8 shadow-2xl">
      <form className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-800 my-6">
            Acesse sua conta
          </h1>
          <p className="text-sm text-gray-500 my-4">
            Entre com suas credenciais abaixo
          </p>
        </div>

        <div className="grid gap-8">
          {/* Campo CPF com máscara e validação */}
          <div className="relative">
            <Input
              id="cpf"
              type="text"
              value={cpf}
              onChange={handleCpfChange}
              required
              className={cn(
                "text-gray-600 placeholder:text-gray-400 placeholder:text-base rounded-4xl py-6 border transition",
                cpfError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
              )}
              placeholder="CPF"
            />
            <User className="absolute left-88 top-3.5 h-5 w-5 text-gray-400" />
            {cpfError && (
              <p className="mt-1 text-sm text-red-500">CPF inválido</p>
            )}
          </div>

          {/* Campo Senha com toggle de visibilidade */}
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              className="text-gray-600 placeholder:text-gray-400 placeholder:text-base rounded-4xl py-6 border transition"
              placeholder="Senha"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-blue-800 transition cursor-pointer"
            >
              {showPassword ? (
                <Unlock className="h-5 w-5" />
              ) : (
                <Lock className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Link Esqueceu a senha */}
          <div className="text-right">
            <button
              type="button"
              onClick={onSwitch}
              className="text-sm font-medium text-blue-800 hover:underline cursor-pointer"
            >
              Esqueceu sua senha?
            </button>
          </div>

          {/* Botão */}
          <Button
            type="submit"
            className="w-full rounded-4xl py-6
                      bg-blue-800 
                      text-white
                      hover:bg-blue-900
                      transform hover:scale-105 transition duration-500"
            disabled={cpfError}
          >
            Conecte-se
          </Button>
        </div>
      </form>
    </div>
  );
}
