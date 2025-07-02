"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonCalendar() {
  return (
    <div className="space-y-6">
      {/* Filtros (sempre visíveis) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} height={36} borderRadius={6} />
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {["Mês", "Semana", "Dia"].map((_, i) => (
            <Skeleton key={i} width={60} height={28} borderRadius={8} />
          ))}
        </div>
        <Skeleton width={90} height={28} borderRadius={8} />
      </div>

      <div className="hidden md:grid grid-cols-7 gap-1">
        {Array.from({ length: 42 }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-md opacity-30"></div>
        ))}
      </div>

      <div className="block md:hidden space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} height={56} borderRadius={10} />
        ))}
      </div>

      {/* Botão flutuante */}
      <div className="flex justify-end">
        <Skeleton circle height={48} width={48} />
      </div>
    </div>
  );
}
