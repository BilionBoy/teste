"use client";

import type { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Navbar from "@/components/shared/Navbar";
import PendingEventsApproval from "@/components/eventos/EventosPendentes";
import type { EventType } from "@/lib/types";
import { useIsMobile } from "@/hooks/useMobile";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  pendingEvents: EventType[];
  isApprovalSheetOpen: boolean;
  onNotificationsClick: () => void;
  onApprovalSheetClose: () => void;
  onApproveEvent: (id: string) => void;
  onRejectEvent: (id: string) => void;
  sidebarDefaultOpen?: boolean;
}

export default function DashboardLayout({
  children,
  title,
  subtitle,
  pendingEvents,
  isApprovalSheetOpen,
  onNotificationsClick,
  onApprovalSheetClose,
  onApproveEvent,
  onRejectEvent,
  sidebarDefaultOpen = false,
}: DashboardLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen bg-gradient-to-br from-background to-background/90 overflow-hidden">
      <SidebarProvider defaultOpen={isMobile === false && sidebarDefaultOpen}>
        <AppSidebar />

        {/* Conteúdo principal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar
            pendingEventsCount={pendingEvents.length}
            onNotificationsClick={onNotificationsClick}
          />

          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header - APENAS DESKTOP */}
            {!isMobile && (
              <div className="px-6 py-4 border-b border-border/40 bg-background/50">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <h1 className="text-xl font-medium text-foreground truncate">
                      {title}
                    </h1>
                    {subtitle && (
                      <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                        {subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Conteúdo da página */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full p-1 md:p-6">{children}</div>
            </div>
          </div>
        </div>

        {/* Painel deslizante de aprovação */}
        <PendingEventsApproval
          pendingEvents={pendingEvents}
          isOpen={isApprovalSheetOpen}
          onClose={onApprovalSheetClose}
          onApprove={onApproveEvent}
          onReject={onRejectEvent}
        />
      </SidebarProvider>
    </div>
  );
}
