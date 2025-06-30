"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import type { EventType } from "@/lib/types";
import { useSidebar } from "@/components/ui/sidebar";
import type { EventDropArg } from "@fullcalendar/core";

// Dynamically import FullCalendar with no SSR
const FullCalendarComponent = dynamic(
  () => import("./FullCalendarWrapper").then((mod) => mod.FullCalendarWrapper),
  {
    ssr: false,
  }
);

interface CalendarProps {
  events: EventType[];
  onEventClick: (info: import("@fullcalendar/core").EventClickArg) => void;
  onDateSelect: (info: import("@fullcalendar/core").DateSelectArg) => void;
  onEventDrop: (info: EventDropArg) => Promise<void>;
  onAddEventClick: () => void;
}

export default function CalendarComponent({
  events,
  onEventClick,
  onDateSelect,
  onEventDrop,
  onAddEventClick,
}: CalendarProps) {
  const [isMounted, setIsMounted] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const { state } = useSidebar();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Efeito para redimensionar o calendário quando o estado da sidebar mudar
  useEffect(() => {
    // Pequeno atraso para garantir que a transição da sidebar tenha terminado
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize-calendar"));
    }, 300);

    return () => clearTimeout(timer);
  }, [state]);

  return (
    // Usar calendar-container para garantir que o calendário ocupe todo o espaço disponível
    <div className="calendar-container">
      <div
        ref={calendarRef}
        className="rounded-xl overflow-hidden shadow-lg flex-1 flex flex-col h-full w-full transition-all duration-300"
      >
        {isMounted && (
          <FullCalendarComponent
            events={events}
            onEventClick={onEventClick}
            onDateSelect={onDateSelect}
            onEventDrop={onEventDrop}
            onAddEventClick={onAddEventClick}
          />
        )}
      </div>
      <style jsx global>{`
        .fc-day-sat,
        .fc-day-sun {
          background-color: #fff5f5;
        }

        .fc-day-disabled {
          background-color: #f9fafb;
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}
