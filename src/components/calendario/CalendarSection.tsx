"use client";

import { useState } from "react";
import type { EventType } from "@/lib/types";
import CalendarComponent from "@/components/calendario/Calendar";
import EventModal from "@/components/eventos/EventModal";
import FilterBar from "@/components/eventos/FilterBar";
import { LoadingError } from "@/components/LoadingError";
import type { EventDropArg } from "@fullcalendar/core";

interface CalendarSectionProps {
  events: EventType[];
  loading: boolean;
  error: string | null;
  organizations: string[];
  locations: string[];
  environments: string[];
  users: string[];
  targetAudiences: string[];
  filters: {
    organization: string;
    location: string;
    environment: string;
    user: string;
    targetAudience: string;
  };
  filteredEvents: EventType[];
  onFilterChange: (
    filterType:
      | "organization"
      | "location"
      | "environment"
      | "user"
      | "targetAudience",
    value: string
  ) => void;
  onAddEvent: (
    event: EventType & { colorClass?: string },
    existingEvent?: EventType | null | undefined
  ) => Promise<void>;
  onDeleteEvent: (id: string) => Promise<void>;
  onEventDrop: (info: EventDropArg) => Promise<void>;
  onRefresh: () => void;
}

export default function CalendarSection({
  events,
  loading,
  error,
  organizations,
  locations,
  environments,
  users,
  targetAudiences,
  filters,
  filteredEvents,
  onFilterChange,
  onAddEvent,
  onDeleteEvent,
  onEventDrop,
  onRefresh,
}: CalendarSectionProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [selectedDates, setSelectedDates] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventClick = (eventInfo: { event: { id: string } }) => {
    const event = events.find((e) => e.id === eventInfo.event.id);
    if (event) {
      setSelectedEvent(event);
      setIsModalOpen(true);
    }
  };

  const handleDateSelect = (selectInfo: { start: Date; end: Date }) => {
    setSelectedDates({
      start: selectInfo.start,
      end: selectInfo.end,
    });
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setSelectedDates({
      start: null,
      end: null,
    });
  };

  const handleAddEventClick = () => {
    setSelectedEvent(null);
    setSelectedDates({
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
    });
    setIsModalOpen(true);
  };

  const onSaveEvent = async (event: EventType & { colorClass?: string }) => {
    await onAddEvent(event, selectedEvent);
    handleCloseModal();
  };

  const onDeleteEventHandler = async (id: string) => {
    await onDeleteEvent(id);
    handleCloseModal();
  };

  return (
    <div className="flex flex-col h-full">
      <LoadingError loading={loading} error={error} onRetry={onRefresh}>
        {/* Barra de filtros */}
        <FilterBar
          organizations={organizations}
          locations={locations}
          environments={environments}
          users={users}
          targetAudiences={targetAudiences}
          filters={filters}
          onFilterChange={onFilterChange}
        />

        {/* Calendário - agora com altura fixa para mobile */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <div className="h-full">
            <CalendarComponent
              events={filteredEvents}
              onEventClick={handleEventClick}
              onDateSelect={handleDateSelect}
              onEventDrop={onEventDrop}
              onAddEventClick={handleAddEventClick}
            />
          </div>
        </div>
      </LoadingError>

      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={onSaveEvent}
        onDelete={onDeleteEventHandler}
        event={selectedEvent}
        selectedDates={selectedDates}
      />
    </div>
  );
}
