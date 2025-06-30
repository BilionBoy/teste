"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { useEvents } from "@/hooks/useEventos";
import SidebarEvents from "./shared/Sidebar";

export function AppSidebar() {
  const { events } = useEvents();

  // Pegar os 5 eventos mais recentes
  const recentEvents = [...events]
    .sort((a, b) => {
      const dateA = new Date(a.start).getTime();
      const dateB = new Date(b.start).getTime();
      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <Sidebar>
      <SidebarEvents recentEvents={recentEvents} />
    </Sidebar>
  );
}
