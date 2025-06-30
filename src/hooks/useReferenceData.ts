"use client";

import { useState, useEffect } from "react";
import { apiService } from "@/services/api";
import type {
  GLocalidade,
  GAmbientePredial,
  GOrganizacao,
  ATipoEvento,
} from "@/lib/types";

export function useReferenceData() {
  const [localidades, setLocalidades] = useState<GLocalidade[]>([]);
  const [ambientesPrediais, setAmbientesPrediais] = useState<
    GAmbientePredial[]
  >([]);
  const [organizacoes, setOrganizacoes] = useState<GOrganizacao[]>([]);
  const [tiposEvento, setTiposEvento] = useState<ATipoEvento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReferenceData = async () => {
    try {
      setLoading(true);
      setError(null);

      const localidadesData = await apiService.getLocalidades();
      const ambientesData = await apiService.getAmbientesPrediais();
      const organizacoesData = await apiService.getOrganizacoes();
      const tiposEventoData = await apiService.getTiposEvento();

      setLocalidades(localidadesData || []);
      setAmbientesPrediais(ambientesData || []);
      setOrganizacoes(organizacoesData || []);
      setTiposEvento(tiposEventoData || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");

      setLocalidades([]);
      setAmbientesPrediais([]);
      setOrganizacoes([]);
      setTiposEvento([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferenceData();
  }, []);

  const refetch = () => {
    fetchReferenceData();
  };

  return {
    localidades,
    ambientesPrediais,
    organizacoes,
    tiposEvento,
    loading,
    error,
    refetch,
  };
}
