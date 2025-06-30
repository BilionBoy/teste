"use client";

import { useState, useEffect } from "react";
import type { EventType } from "@/lib/types";
import {
  convertApiEventToFrontend,
  convertFrontendEventToApi,
} from "@/lib/types";
import { apiService } from "@/services/api";

export function useEvents() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [pendingEvents, setPendingEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar eventos da API
  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Carregando eventos da API...");
      const apiEvents = await apiService.getEventos();
      console.log("Eventos recebidos da API:", apiEvents);

      const frontendEvents = apiEvents.map(convertApiEventToFrontend);
      console.log("Eventos convertidos para frontend:", frontendEvents);

      // Separar eventos confirmados dos pendentes
      const confirmed = frontendEvents.filter(
        (event) => event.status === "confirmado"
      );
      const pending = frontendEvents.filter(
        (event) => event.status === "pendente"
      );

      setEvents(confirmed);
      setPendingEvents(pending);

      console.log("Eventos confirmados:", confirmed);
      console.log("Eventos pendentes:", pending);
    } catch (err) {
      console.error("Erro ao carregar eventos:", err);
      setError("Erro ao carregar eventos. Verifique sua conexão com a API.");

      // Não usar fallback mockado - deixar vazio em caso de erro
      setEvents([]);
      setPendingEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // Carregar eventos ao montar o componente
  useEffect(() => {
    loadEvents();
  }, []);

  const handleAddEvent = async (
    event: EventType & { colorClass?: string },
    selectedEvent: EventType | null
  ) => {
    try {
      setLoading(true);
      setError(null);

      console.log("Salvando evento:", event);

      if (selectedEvent) {
        // Editar evento existente
        const apiEventData = convertFrontendEventToApi(event);
        console.log("Dados para atualizar evento:", apiEventData);

        const updatedApiEvent = await apiService.updateEvento(
          Number.parseInt(selectedEvent.id),
          apiEventData
        );
        const updatedEvent = convertApiEventToFrontend(updatedApiEvent);

        setEvents(
          events.map((e) => (e.id === selectedEvent.id ? updatedEvent : e))
        );
        console.log("Evento atualizado com sucesso");
      } else {
        // Adicionar novo evento
        const apiEventData = convertFrontendEventToApi(event);
        console.log("Dados para criar evento:", apiEventData);

        const newApiEvent = await apiService.createEvento(apiEventData);
        console.log("Evento criado na API:", newApiEvent);

        const newEvent = convertApiEventToFrontend(newApiEvent);
        setEvents([...events, newEvent]);
        console.log("Evento adicionado ao estado local");
      }
    } catch (err) {
      console.error("Erro ao salvar evento:", err);
      setError("Erro ao salvar evento. Tente novamente.");
      throw err; // Re-throw para o modal tratar
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log("Deletando evento:", id);
      await apiService.deleteEvento(Number.parseInt(id));
      setEvents(events.filter((event) => event.id !== id));
      console.log("Evento deletado com sucesso");
    } catch (err) {
      console.error("Erro ao deletar evento:", err);
      setError("Erro ao deletar evento. Tente novamente.");
      throw err; // Re-throw para o modal tratar
    } finally {
      setLoading(false);
    }
  };

  type EventDropInfo = {
    event: {
      id: string;
      start: Date;
      end: Date;
    };
  };

  const handleEventDrop = async (eventDropInfo: EventDropInfo) => {
    const { event } = eventDropInfo;

    try {
      const existingEvent = events.find((e) => e.id === event.id);
      if (!existingEvent) return;

      const updatedEvent = {
        ...existingEvent,
        start: event.start,
        end: event.end,
      };

      const apiEventData = convertFrontendEventToApi(updatedEvent);
      await apiService.updateEvento(Number.parseInt(event.id), apiEventData);

      setEvents(events.map((e) => (e.id === event.id ? updatedEvent : e)));
      setError(null);
    } catch (err) {
      console.error("Erro ao mover evento:", err);
      setError("Erro ao mover evento. Tente novamente.");
    }
  };

  const handleApproveEvent = async (id: string) => {
    try {
      const eventToApprove = pendingEvents.find((event) => event.id === id);
      if (!eventToApprove) return;

      const updatedEvent = { ...eventToApprove, status: "confirmado" };
      const apiEventData = convertFrontendEventToApi(updatedEvent);

      await apiService.updateEvento(Number.parseInt(id), apiEventData);

      setEvents([...events, updatedEvent]);
      setPendingEvents(pendingEvents.filter((event) => event.id !== id));
      setError(null);
    } catch (err) {
      console.error("Erro ao aprovar evento:", err);
      setError("Erro ao aprovar evento. Tente novamente.");
    }
  };

  const handleRejectEvent = async (id: string) => {
    try {
      await apiService.deleteEvento(Number.parseInt(id));
      setPendingEvents(pendingEvents.filter((event) => event.id !== id));
      setError(null);
    } catch (err) {
      console.error("Erro ao rejeitar evento:", err);
      setError("Erro ao rejeitar evento. Tente novamente.");
    }
  };

  // Função para recarregar dados
  const refreshEvents = () => {
    loadEvents();
  };

  return {
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
  };
}
