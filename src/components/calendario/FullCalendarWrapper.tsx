"use client";

import { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import "@/assets/styles/calendar-premium.css";
import { Plus } from "lucide-react";
import type { EventType } from "@/lib/types";
import type {
  EventClickArg,
  DateSelectArg,
  EventDropArg,
} from "@fullcalendar/core";
import { motion } from "framer-motion";
import { useSidebar } from "@/components/ui/sidebar";

interface FullCalendarWrapperProps {
  events: EventType[];
  onEventClick: (info: EventClickArg) => void;
  onDateSelect: (info: DateSelectArg) => void;
  onEventDrop: (info: EventDropArg) => void;
  onAddEventClick: () => void;
}

export function FullCalendarWrapper({
  events,
  onEventClick,
  onDateSelect,
  onEventDrop,
  onAddEventClick,
}: FullCalendarWrapperProps) {
  const calendarRef = useRef<FullCalendar>(null);
  const { state } = useSidebar();

  // Adicionar um listener para o evento resize-calendar
  useEffect(() => {
    const handleResize = () => {
      if (calendarRef.current) {
        // Forçar o FullCalendar a recalcular seu tamanho
        setTimeout(() => {
          calendarRef.current?.getApi().updateSize();
        }, 0);
      }
    };

    window.addEventListener("resize-calendar", handleResize);
    window.addEventListener("resize", handleResize);

    // Chamar updateSize uma vez após o componente montar
    handleResize();

    return () => {
      window.removeEventListener("resize-calendar", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Efeito para redimensionar o calendário quando o estado da sidebar mudar
  useEffect(() => {
    if (calendarRef.current) {
      // Pequeno atraso para garantir que a transição da sidebar tenha terminado
      setTimeout(() => {
        calendarRef.current?.getApi().updateSize();
      }, 300);
    }
  }, [state]);

  return (
    <div className="calendar-premium">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        buttonText={{
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events.map((event) => {
          // Verifica se a cor é uma classe predefinida ou uma cor personalizada
          const isCustomColor =
            event.colorClass && !event.colorClass.startsWith("event-");

          return {
            id: event.id,
            title: event.title,
            start: event.start,
            end: event.end,
            className: !isCustomColor ? event.colorClass || "event-blue" : "",
            backgroundColor: isCustomColor ? event.colorClass : undefined,
            borderColor: isCustomColor ? event.colorClass : undefined,
            textColor: isCustomColor ? "#ffffff" : undefined,
            extendedProps: {
              description: event.description,
            },
          };
        })}
        eventClick={(info) => onEventClick(info)}
        select={(info) => onDateSelect(info)}
        eventDrop={(info) => onEventDrop(info)}
        height="100%" // Mudamos de "auto" para "100%" para ocupar todo o espaço disponível
        locales={[ptBrLocale]}
        locale="pt-br"
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
          hour12: false,
        }}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        nowIndicator={true}
        allDaySlot={true}
        allDayText="Dia todo"
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5], // Segunda a sexta
          startTime: "08:00",
          endTime: "18:00",
        }}
        eventDisplay="block"
        dayHeaderFormat={{ weekday: "short", day: "numeric" }}
      />
      <motion.button
        className="add-event-button"
        onClick={onAddEventClick}
        aria-label="Adicionar evento"
        title="Adicionar novo evento"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus />
      </motion.button>
    </div>
  );
}

export default FullCalendarWrapper;
