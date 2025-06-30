"use client";

import { useState, useMemo } from "react";
import type { EventType } from "@/lib/types";
import { useReferenceData } from "@/hooks/useReferenceData";

export function useFilters() {
  const [filters, setFilters] = useState({
    organization: "",
    location: "",
    environment: "",
    user: "",
    targetAudience: "",
  });

  // Buscar dados dinâmicos da API
  const {
    localidades,
    ambientesPrediais,
    organizacoes,
    loading: loadingRef,
    error: errorRef,
  } = useReferenceData();

  // Mapear dados da API para o formato dos filtros
  const organizations = useMemo(() => {
    const orgList = ["Todos"];
    if (organizacoes?.length) {
      orgList.push(...organizacoes.map((org) => org.descricao));
    }
    return orgList;
  }, [organizacoes]);

  const locations = useMemo(() => {
    const locList = ["Todos"];
    if (localidades?.length) {
      locList.push(...localidades.map((loc) => loc.descricao));
    }
    return locList;
  }, [localidades]);

  const environments = useMemo(() => {
    const envList = ["Todos"];
    if (ambientesPrediais?.length) {
      envList.push(...ambientesPrediais.map((env) => env.descricao));
    }
    return envList;
  }, [ambientesPrediais]);

  // Lista de usuários temporária
  const users = useMemo(
    () => ["Todos", "Jose", "Maria", "Joao", "Fernanda", "Mariana", "Fabricio"],
    []
  );

  // Público-alvo estático
  const targetAudiences = useMemo(
    () => [
      "Todos",
      "Professores",
      "Coordenadores",
      "Diretores",
      "Secretários",
      "Estudantes",
      "Profissionais da Saúde",
    ],
    []
  );

  const handleFilterChange = (
    filterType:
      | "organization"
      | "location"
      | "environment"
      | "user"
      | "targetAudience",
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const getFilteredEvents = (events: EventType[]) => {
    return events.filter((event) => {
      return (
        (filters.organization === "" ||
          filters.organization === "Todos" ||
          event.organization === filters.organization) &&
        (filters.location === "" ||
          filters.location === "Todos" ||
          event.location?.name === filters.location) &&
        (filters.environment === "" ||
          filters.environment === "Todos" ||
          event.location?.ambiente === filters.environment) &&
        (filters.user === "" ||
          filters.user === "Todos" ||
          event.user === filters.user) &&
        (filters.targetAudience === "" ||
          filters.targetAudience === "Todos" ||
          (event.targetAudience &&
            event.targetAudience.includes(filters.targetAudience)))
      );
    });
  };

  const clearFilters = () => {
    setFilters({
      organization: "",
      location: "",
      environment: "",
      user: "",
      targetAudience: "",
    });
  };

  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(
      (filter) => filter !== "" && filter !== "Todos"
    );
  }, [filters]);

  return {
    filters,
    organizations,
    locations,
    environments,
    users,
    targetAudiences,
    handleFilterChange,
    getFilteredEvents,
    clearFilters,
    hasActiveFilters,
    loading: loadingRef,
    error: errorRef,
  };
}
