"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import CalendarSection from "@/components/calendario/CalendarSection";
import { useEvents } from "@/hooks/useEventos";
import { useFilters } from "@/hooks/useFiltros";
import DepartmentsSection from "@/components/gerencia/OrganizacionaisSection";
import ReportsSection from "@/components/gerencia/ReportsSection";

export default function GerenciaPage() {
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
      title="Painel de Gerência"
      subtitle="Gerencie eventos e visualize estatísticas da sua gerência"
      pendingEvents={pendingEvents}
      isApprovalSheetOpen={isApprovalSheetOpen}
      onNotificationsClick={() => setIsApprovalSheetOpen(!isApprovalSheetOpen)}
      onApprovalSheetClose={() => setIsApprovalSheetOpen(false)}
      onApproveEvent={handleApproveEvent}
      onRejectEvent={handleRejectEvent}
      sidebarDefaultOpen={true}
    >
      <Tabs defaultValue="calendar" className="w-full flex-1 flex flex-col">
        <TabsList className="mb-4">
          <TabsTrigger value="calendar">Calendário</TabsTrigger>
          <TabsTrigger value="departments">Gerência Organizacional</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent
          value="calendar"
          className="space-y-4 flex-1 flex flex-col"
        >
          {/* Card de estatísticas */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-muted rounded-lg p-3">
                  <h3 className="text-sm font-medium">Total de Eventos</h3>
                  <p className="text-2xl font-bold">{events.length}</p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <h3 className="text-sm font-medium">Eventos Este Mês</h3>
                  <p className="text-2xl font-bold">
                    {
                      events.filter((e) => {
                        const today = new Date();
                        const eventDate = new Date(e.start);
                        return (
                          eventDate.getMonth() === today.getMonth() &&
                          eventDate.getFullYear() === today.getFullYear()
                        );
                      }).length
                    }
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <h3 className="text-sm font-medium">
                    Gerência Organizacional
                  </h3>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <h3 className="text-sm font-medium">Coordenadores</h3>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex-1 flex flex-col">
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
          </div>
        </TabsContent>

        <TabsContent value="departments">
          <DepartmentsSection />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsSection />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
