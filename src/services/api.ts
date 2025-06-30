import type {
  AEvento,
  CreateEventoRequest,
  GLocalidade,
  GAmbientePredial,
  GOrganizacao,
  ATipoEvento,
  Usuario,
  GLocalidadeRaw,
  GAmbientePredialRaw,
  GOrganizacaoRaw,
  ATipoEventoRaw,
  ApiResponse,
} from "@/lib/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://10.7.3.95:3000/api/v1";

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    try {
      const response = await fetch(url, {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(`API request failed: ${endpoint}`, error);
      }
      throw error;
    }
  }

  async getEventos(): Promise<AEvento[]> {
    try {
      const response = await this.request<AEvento>("/a_eventos");
      return response?.data?.items || [];
    } catch {
      return [];
    }
  }

  async createEvento(evento: CreateEventoRequest): Promise<AEvento> {
    const response = await this.request<AEvento>("/a_eventos", {
      method: "POST",
      body: JSON.stringify(evento),
    });

    if (!response.success) {
      throw new Error(`Failed to create event: ${response.message}`);
    }

    if (response.data?.items?.[0]) {
      return response.data.items[0];
    }

    const allEvents = await this.getEventos();
    const latestEvent = allEvents[allEvents.length - 1];

    if (!latestEvent) {
      throw new Error("Event created but could not be retrieved");
    }

    return latestEvent;
  }

  async updateEvento(
    id: number,
    evento: Partial<CreateEventoRequest>
  ): Promise<AEvento> {
    const response = await this.request<AEvento>(`/a_eventos/${id}`, {
      method: "PUT",
      body: JSON.stringify(evento),
    });

    if (!response.success) {
      throw new Error(`Failed to update event: ${response.message}`);
    }

    return response.data?.items?.[0] || (await this.getEventById(id));
  }

  async deleteEvento(id: number): Promise<void> {
    const response = await this.request(`/a_eventos/${id}`, {
      method: "DELETE",
    });

    if (!response.success) {
      throw new Error(`Failed to delete event: ${response.message}`);
    }
  }

  private async getEventById(id: number): Promise<AEvento> {
    const events = await this.getEventos();
    const event = events.find((e) => e.id === id);

    if (!event) {
      throw new Error(`Event with ID ${id} not found`);
    }

    return event;
  }

  // ===== Reference Data =====

  async getTiposEvento(): Promise<ATipoEvento[]> {
    try {
      const response = await this.request<ATipoEventoRaw>("/a_tipo_eventos");
      return (
        response?.data?.items?.map((item, index) => ({
          id: item.id || 4000 + index,
          descricao: item.descricao,
        })) || []
      );
    } catch {
      return [];
    }
  }

  async getUsuarios(): Promise<Usuario[]> {
    try {
      const response = await this.request<Usuario>("/usuarios");
      return response?.data?.items || [];
    } catch {
      return [];
    }
  }

  async getLocalidades(): Promise<GLocalidade[]> {
    try {
      const response = await this.request<GLocalidadeRaw>("/g_localidades");
      return (
        response?.data?.items?.map((item, index) => ({
          id: item.g_distrito_id || 1000 + index,
          descricao: item.descricao,
        })) || []
      );
    } catch {
      return [];
    }
  }

  async getAmbientesPrediais(): Promise<GAmbientePredial[]> {
    try {
      const response = await this.request<GAmbientePredialRaw>(
        "/g_ambientes_prediais"
      );
      return (
        response?.data?.items?.map((item, index) => ({
          id: item.id || item.g_distrito_id || 2000 + index,
          descricao: item.descricao,
        })) || []
      );
    } catch {
      return [];
    }
  }

  async getOrganizacoes(): Promise<GOrganizacao[]> {
    try {
      const response = await this.request<GOrganizacaoRaw>(
        "/r_organizacionais"
      );
      return (
        response?.data?.items?.map((item, index) => ({
          id: item.id || item.g_distrito_id || 3000 + index,
          descricao: item.descricao,
        })) || []
      );
    } catch {
      return [];
    }
  }
}

export const apiService = new ApiService();
export default apiService;
