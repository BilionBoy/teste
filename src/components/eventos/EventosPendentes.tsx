"use client";

import type { EventType } from "@/lib/types";

interface PendingEventsApprovalProps {
  pendingEvents: EventType[];
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function PendingEventsApproval({
  pendingEvents,
  isOpen,
  onClose,
  onApprove,
  onReject,
}: PendingEventsApprovalProps) {
  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 bg-card shadow-xl transform transition-transform duration-300 ease-in-out z-20 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">Aprovações Pendentes</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted/80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {pendingEvents.length > 0 ? (
            <div className="space-y-4">
              {pendingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-card border rounded-lg p-4 shadow-sm"
                >
                  <h3 className="font-medium text-lg">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {new Date(event.start).toLocaleDateString()}{" "}
                    {new Date(event.start).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-sm mb-2">{event.description}</p>

                  <div className="text-xs text-muted-foreground mb-3 space-y-1">
                    <p>
                      <strong>Organização:</strong> {event.organization}
                    </p>
                    <p>
                      <strong>Usuário:</strong> {event.user}
                    </p>
                    <p>
                      <strong>Local:</strong> {event.location?.name} -{" "}
                      {event.location?.ambiente}
                    </p>
                    {event.targetAudience && (
                      <p>
                        <strong>Público:</strong>{" "}
                        {event.targetAudience.join(", ")}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => onApprove(event.id)}
                      className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-md text-sm hover:bg-emerald-700 transition-colors cursor-pointer"
                    >
                      Aprovar
                    </button>
                    <button
                      onClick={() => onReject(event.id)}
                      className="px-3 py-1 bg-rose-600 text-white font-bold rounded-md text-sm hover:bg-rose-700 transition-colors cursor-pointer"
                    >
                      Rejeitar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-4 opacity-50"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <p>Não há eventos pendentes de aprovação</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
