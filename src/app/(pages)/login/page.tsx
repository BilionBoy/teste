"use client";

import Image from "next/image";
import AuthForms from "@/components/AuthForms";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <AuthForms />

      {/* Imagem lateral – permanece igual */}
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/calendario2.jpeg"
          alt="Calendário Rondônia"
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}
