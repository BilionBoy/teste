"use client";

import { BellRing, Search, Sparkles } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  pendingEventsCount: number;
  onNotificationsClick: () => void;
}

export default function Navbar({
  pendingEventsCount,
  onNotificationsClick,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Liquid Glass Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/90 to-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30" />
      </div>

      <div className="relative flex h-16 md:h-18 items-center justify-between px-4 md:px-6">
        {/* Left section */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative">
            <SidebarTrigger className="shrink-0 hover:bg-white/60 hover:shadow-md transition-all duration-300 rounded-xl backdrop-blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
          </div>

          <div className="flex items-center relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
          </div>
        </div>

        {/* Center section - Enhanced Search */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
            <div className="relative bg-white/60 backdrop-blur-xl border border-white/30 rounded-xl shadow-lg shadow-black/5 overflow-hidden">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-hover:text-blue-500" />
              <Input
                placeholder="Buscar eventos..."
                className="w-full pl-11 pr-4 py-3 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-400 text-slate-700 font-medium"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Sparkles className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Right section - Enhanced buttons */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Mobile search button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden h-10 w-10 p-0 rounded-xl bg-white/40 backdrop-blur-sm border border-white/20 hover:bg-white/60 hover:shadow-lg transition-all duration-300 group"
            aria-label="Buscar"
          >
            <Search className="h-4 w-4 text-slate-600 group-hover:text-blue-500 transition-colors" />
          </Button>

          {/* Enhanced Notifications */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onNotificationsClick}
            className="relative h-10 w-10 p-0 rounded-xl bg-white/40 backdrop-blur-sm border border-white/20 hover:bg-white/60 hover:shadow-lg transition-all duration-300 group"
            aria-label={`Notificações${
              pendingEventsCount > 0 ? ` (${pendingEventsCount})` : ""
            }`}
          >
            <BellRing className="h-4 w-4 text-slate-600 group-hover:text-blue-500 transition-colors" />
            {pendingEventsCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold flex items-center justify-center shadow-lg animate-pulse">
                {pendingEventsCount > 9 ? "9+" : pendingEventsCount}
              </span>
            )}
          </Button>

          {/* Enhanced User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full p-0 ml-1 bg-white/40 backdrop-blur-sm border border-white/20 hover:bg-white/60 hover:shadow-lg transition-all duration-300 group"
                aria-label="Menu do usuário"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#003399]/30 to-[#0055cc]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                <Avatar className="h-8 w-8 relative z-10">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Avatar do usuário"
                  />
                  <AvatarFallback className="text-xs font-bold bg-gradient-to-br from-[#003399] to-[#0055cc] text-white border-2 border-white/50">
                    RO
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 bg-white/90 backdrop-blur-xl border border-white/30 shadow-2xl shadow-black/10 rounded-2xl p-2"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal p-3">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-gradient-to-br from-[#003399] to-[#0055cc] text-white font-bold">
                        RO
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Usuário Admin
                      </p>
                      <p className="text-xs text-gray-600">
                        admin@governo.ro.gov.br
                      </p>
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
              <DropdownMenuItem className="cursor-pointer rounded-xl hover:bg-white/60 transition-all duration-200 m-1 p-3">
                <span className="font-medium text-slate-700">Meu Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-xl hover:bg-white/60 transition-all duration-200 m-1 p-3">
                <span className="font-medium text-slate-700">
                  Configurações
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-xl hover:bg-white/60 transition-all duration-200 m-1 p-3">
                <span className="font-medium text-slate-700">Ajuda</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
              <DropdownMenuItem className="cursor-pointer rounded-xl hover:bg-red-50 transition-all duration-200 m-1 p-3 text-red-600 focus:text-red-600">
                <span className="font-medium">Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
