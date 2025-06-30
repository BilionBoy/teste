"use client"

import type { EventType } from "@/lib/types"
import { Calendar, Clock, CheckCircle, XCircle, Users, Briefcase, Target } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ApprovalSidebarProps {
  pendingEvents: EventType[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

export default function ApprovalSidebar({ pendingEvents, onApprove, onReject }: ApprovalSidebarProps) {
  return (
    <aside className="w-80 bg-white border-l border-gray-200 p-4 hidden lg:block overflow-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-primary" />
          Solicitações Pendentes
          {pendingEvents.length > 0 && (
            <span className="ml-2 bg-primary text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
              {pendingEvents.length}
            </span>
          )}
        </h2>
        <div className="space-y-4">
          {pendingEvents.map((event) => (
            <div key={event.id} className="p-4 rounded-lg border border-gray-200 bg-gray-50">
              <div className="flex items-start">
                <div className={`w-2 h-2 rounded-full mt-1.5 mr-2 ${getColorClass(event.colorClass)}`} />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>
                      {format(new Date(event.start), "dd MMM, HH:mm", {
                        locale: ptBR,
                      })}
                      {" - "}
                      {format(new Date(event.end), "HH:mm", {
                        locale: ptBR,
                      })}
                    </span>
                  </div>
                  {event.location && (
                    <div className="text-sm text-gray-500 mt-1">
                      {event.location.name}
                      {event.location.ambiente && <span> • {event.location.ambiente}</span>}
                    </div>
                  )}
                  {event.organization && (
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {event.organization}
                    </div>
                  )}
                  {event.user && (
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Users className="h-3 w-3 mr-1" />
                      {event.user}
                    </div>
                  )}
                  {event.targetAudience && event.targetAudience.length > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center text-xs text-gray-500 mb-1">
                        <Target className="h-3 w-3 mr-1" />
                        Público Alvo:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {event.targetAudience.map((audience) => (
                          <Badge key={audience} variant="outline" className="text-xs">
                            {audience}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {event.description && <div className="text-sm text-gray-500 mt-2">{event.description}</div>}
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" className="flex-1" onClick={() => onApprove(event.id)}>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Aprovar
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => onReject(event.id)}>
                      <XCircle className="h-4 w-4 mr-1" />
                      Rejeitar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {pendingEvents.length === 0 && (
            <div className="text-center py-10 text-gray-500">Nenhuma solicitação pendente</div>
          )}
        </div>
      </div>
    </aside>
  )
}

function getColorClass(colorClass?: string) {
  switch (colorClass) {
    case "event-blue":
      return "bg-blue-500"
    case "event-green":
      return "bg-green-500"
    case "event-orange":
      return "bg-orange-500"
    case "event-purple":
      return "bg-purple-500"
    case "event-red":
      return "bg-red-500"
    case "event-yellow":
      return "bg-yellow-500"
    default:
      return "bg-gray-500"
  }
}
