"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import CalendarSection from "@/components/calendario/CalendarSection";
import { useEvents } from "@/hooks/useEventos";
import { useFilters } from "@/hooks/useFiltros";

export default function HomePage() {
  const {
    events,
    pendingEvents,
    loading,
    error,
    handleAddEvent,
    handleDeleteEvent,
    handleEventDrop,
    handleApproveEvent,
    handleRejectEvent,
    refreshEvents,
  } = useEvents();

  const {
    filters,
    organizations,
    locations,
    environments,
    users,
    targetAudiences,
    handleFilterChange,
    getFilteredEvents,
  } = useFilters();

  const [isApprovalSheetOpen, setIsApprovalSheetOpen] = useState(false);

  const filteredEvents = getFilteredEvents(events);

  return (
    <DashboardLayout
      title="Calendário de Eventos"
      subtitle="Gerencie seus eventos e compromissos. Use o botão na barra superior para mostrar/ocultar a sidebar de estatísticas."
      pendingEvents={pendingEvents}
      isApprovalSheetOpen={isApprovalSheetOpen}
      onNotificationsClick={() => setIsApprovalSheetOpen(!isApprovalSheetOpen)}
      onApprovalSheetClose={() => setIsApprovalSheetOpen(false)}
      onApproveEvent={handleApproveEvent}
      onRejectEvent={handleRejectEvent}
      sidebarDefaultOpen={true}
    >
      <CalendarSection
        events={events}
        loading={loading}
        error={error}
        organizations={organizations}
        locations={locations}
        environments={environments}
        users={users}
        targetAudiences={targetAudiences}
        filters={filters}
        filteredEvents={filteredEvents}
        onFilterChange={handleFilterChange}
        onAddEvent={handleAddEvent}
        onDeleteEvent={handleDeleteEvent}
        onEventDrop={handleEventDrop}
        onRefresh={refreshEvents}
      />
    </DashboardLayout>
  );
}
