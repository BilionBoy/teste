import type { EventType } from "@/lib/types";
import {
  Calendar,
  Clock,
  BarChart3,
  FileText,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface SidebarProps {
  recentEvents: EventType[];
}

export default function SidebarEvents({ recentEvents }: SidebarProps) {
  return (
    <div className="flex flex-col h-full w-full overflow-auto bg-slate-50/60 backdrop-blur-sm">
      <div className="p-6 space-y-8">
        {/* Statistics Section - Aplicando Golden Ratio e Grid System */}
        <section className="space-y-5">
          {/* Header com Hierarquia Tipográfica Clara */}
          <header className="flex items-center gap-3 pb-1">
            <div className="flex items-center justify-center w-8 h-8 bg-emerald-50 border border-emerald-100 rounded-lg">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
            </div>
            <h2 className="text-base font-semibold text-slate-900 tracking-[-0.01em] leading-none">
              Estatísticas
            </h2>
          </header>

          {/* Cards Grid - Proporção 1:1 com Espaçamento Harmônico */}
          <div className="grid grid-cols-2 gap-4">
            {/* Card Eventos Recentes - Sistema de Bordas Consistente */}
            <div className="group relative">
              {/* Glow Effect Layer */}
              <div className="absolute -inset-px bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-sm" />

              {/* Main Card */}
              <div className="relative bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-emerald-200/80">
                {/* Card Header - Alinhamento Óptico */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-2xl font-bold text-emerald-600 leading-none tabular-nums">
                    {recentEvents.length}
                  </div>
                  <div className="flex items-center justify-center w-7 h-7 bg-emerald-50 rounded-lg">
                    <FileText className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                </div>

                {/* Card Content - Hierarquia de Informação */}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-700 leading-tight">
                    Eventos
                  </p>
                  <p className="text-xs font-medium text-slate-500 leading-tight">
                    Recentes
                  </p>
                </div>

                {/* Visual Indicator - Proporção Áurea */}
                <div className="mt-4 h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full opacity-80" />
              </div>
            </div>

            {/* Card Próximos Eventos - Consistência Visual */}
            <div className="group relative">
              {/* Glow Effect Layer */}
              <div className="absolute -inset-px bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-sm" />

              {/* Main Card */}
              <div className="relative bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-200/80">
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-2xl font-bold text-blue-600 leading-none tabular-nums">
                    {getUpcomingEventsCount(recentEvents)}
                  </div>
                  <div className="flex items-center justify-center w-7 h-7 bg-blue-50 rounded-lg">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-700 leading-tight">
                    Próximos
                  </p>
                  <p className="text-xs font-medium text-slate-500 leading-tight">
                    Eventos
                  </p>
                </div>

                {/* Visual Indicator */}
                <div className="mt-4 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full opacity-80" />
              </div>
            </div>
          </div>
        </section>

        {/* Events Section - Aplicando Princípios de Proximidade */}
        <section className="space-y-5">
          {/* Header Consistente */}
          <header className="flex items-center gap-3 pb-1">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-50 border border-blue-100 rounded-lg">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="text-base font-semibold text-slate-900 tracking-[-0.01em] leading-none">
              Eventos Recentes
            </h2>
          </header>

          {/* Events List - Ritmo Visual Consistente */}
          <div className="space-y-3">
            {recentEvents.map((event) => (
              <article key={event.id} className="group relative">
                {/* Subtle Hover Effect */}
                <div className="absolute -inset-px bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg opacity-0 group-hover:opacity-40 transition-opacity duration-200 blur-sm" />

                {/* Event Card - Proporções Calculadas */}
                <div className="relative bg-white border border-slate-200/60 rounded-lg p-4 hover:border-slate-300/80 hover:shadow-sm transition-all duration-200">
                  <div className="flex items-start gap-3">
                    {/* Status Indicator - Alinhamento Óptico */}
                    <div className="flex-shrink-0 mt-1.5">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${getEventStatusColor(
                          event.colorClass
                        )} shadow-sm`}
                      />
                    </div>

                    {/* Event Content - Hierarquia de Leitura */}
                    <div className="flex-1 min-w-0 space-y-2.5">
                      {/* Event Title - Peso Visual Adequado */}
                      <h3 className="text-sm font-semibold text-slate-900 leading-tight tracking-[-0.005em] line-clamp-1">
                        {event.title}
                      </h3>

                      {/* Event Meta - Agrupamento Visual */}
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span className="font-medium tabular-nums">
                            {formatDistanceToNow(new Date(event.start), {
                              addSuffix: true,
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Event Location - Hierarquia Secundária */}
                      {event.location && (
                        <div className="flex items-start gap-1.5 text-xs">
                          <MapPin className="w-3 h-3 text-slate-400 mt-0.5 flex-shrink-0" />
                          <div className="leading-tight">
                            <p className="font-medium text-slate-700">
                              {event.location.name}
                            </p>
                            {event.location.ambiente && (
                              <p className="text-slate-500 mt-0.5">
                                {event.location.ambiente}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {/* Empty State - Design Centrado */}
            {recentEvents.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-white border border-slate-200/60 rounded-xl p-8 shadow-sm">
                  <div className="flex items-center justify-center w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl mx-auto mb-4">
                    <Calendar className="w-5 h-5 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-1">
                    Nenhum evento recente
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[180px] mx-auto">
                    Os eventos da agenda aparecerão aqui quando criados
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function getEventStatusColor(colorClass?: string) {
  switch (colorClass) {
    case "event-blue":
      return "bg-blue-500";
    case "event-green":
      return "bg-emerald-500";
    case "event-orange":
      return "bg-orange-500";
    case "event-purple":
      return "bg-purple-500";
    case "event-red":
      return "bg-red-500";
    case "event-yellow":
      return "bg-yellow-500";
    default:
      return "bg-slate-400";
  }
}

function getUpcomingEventsCount(events: EventType[]) {
  const now = new Date();
  return events.filter((event) => new Date(event.start) > now).length;
}
