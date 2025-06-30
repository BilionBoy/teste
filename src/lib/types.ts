export type Pagination = {
  current_page: number;
  total_pages: number;
  total_count: number;
  per_page: number;
};

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: {
    items: T[];
    pagination?: Pagination;
  };
}

// --- Interfaces para dados BRUTOS da API (como vêm da API) ---

export interface GLocalidadeRaw {
  descricao: string;
  g_distrito_id: number;
}

export interface GAmbientePredialRaw {
  id?: number;
  descricao: string;
  g_distrito_id?: number;
}

export interface GOrganizacaoRaw {
  id?: number;
  descricao: string;
  g_distrito_id?: number;
}

export interface ATipoEventoRaw {
  id: number;
  descricao: string;
}

// --- Interfaces processadas (formato padronizado) ---

export interface GLocalidade {
  id: number;
  descricao: string;
}

export interface GAmbientePredial {
  id: number;
  descricao: string;
}

export interface GCategoriaOrganizacao {
  id: number;
  descricao: string;
}

export interface ATipoEvento {
  id: number;
  descricao: string;
}

export interface GStatus {
  id: number;
  descricao: string;
}

export interface GOrganizacao {
  id: number;
  descricao: string;
}

export interface Usuario {
  id: number;
  cpf: string;
  password: string;
}

// --- Interfaces principais (modelo AEvento e relacionados) ---

export interface AEvento {
  id: number;
  assunto: string;
  data_hora_inicio: string;
  data_hora_fim: string;
  titulo: string;
  observacao?: string | null;
  publico_alvo: string;
  visibilidade: boolean;
  g_localidade?: GLocalidade | null;
  g_ambiente_predial?: GAmbientePredial | null;
  g_categoria_organizacao?: GCategoriaOrganizacao | null;
  a_tipo_evento?: ATipoEvento | null;
  g_status?: GStatus | null;
  g_organizacao?: GOrganizacao | null;
  usuario?: Usuario | null;
}

// --- Requisição para criação/atualização de evento ---

export interface CreateEventoRequest {
  assunto: string;
  data_hora_inicio: string;
  data_hora_fim: string;
  titulo: string;
  observacao?: string;
  publico_alvo: string;
  visibilidade: boolean;
  g_localidade_id?: number;
  g_ambiente_predial_id?: number;
  g_categoria_organizacao_id?: number;
  a_tipo_evento_id?: number;
  g_status_id?: number;
  g_organizacao_id?: number;
  usuario_id?: number;
}

// --- Tipos do Frontend ---

export interface EventType {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  colorClass?: string;
  eventType?: string;
  meetingLink?: string;
  isPrivate?: boolean;
  participants?: Person[];
  building?: boolean;
  location?: LocationType;
  organization?: string;
  user?: string;
  targetAudience?: string[];
  status?: string;

  // Campos da API (uso interno)
  assunto?: string;
  observacao?: string | null;
  publico_alvo?: string;
  visibilidade?: boolean;

  // IDs para relacionamentos
  g_localidade_id?: number;
  g_ambiente_predial_id?: number;
  g_categoria_organizacao_id?: number;
  a_tipo_evento_id?: number;
  g_status_id?: number;
  g_organizacao_id?: number;
  usuario_id?: number;
}

export interface LocationType {
  id: string;
  name: string;
  ambiente?: string;
}

export interface Person {
  id: string;
  name: string;
  email: string;
}

// --- Funções de Conversão ---

export function convertApiEventToFrontend(apiEvent: AEvento): EventType {
  return {
    id: apiEvent.id.toString(),
    title: apiEvent.titulo || apiEvent.assunto,
    start: new Date(apiEvent.data_hora_inicio),
    end: new Date(apiEvent.data_hora_fim),
    description: apiEvent.observacao ?? undefined,
    assunto: apiEvent.assunto,
    observacao: apiEvent.observacao ?? undefined,
    publico_alvo: apiEvent.publico_alvo,
    visibilidade: apiEvent.visibilidade,
    colorClass: "event-blue",
    eventType: apiEvent.a_tipo_evento?.descricao || "Curso",
    building: true,
    location: apiEvent.g_localidade
      ? {
          id: apiEvent.g_localidade.id.toString(),
          name: apiEvent.g_localidade.descricao,
          ambiente: apiEvent.g_ambiente_predial?.descricao,
        }
      : undefined,
    organization: apiEvent.g_organizacao?.descricao,
    user: apiEvent.usuario?.cpf,
    targetAudience: apiEvent.publico_alvo
      ? apiEvent.publico_alvo
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [],
    status: apiEvent.g_status?.descricao || "confirmado",
    isPrivate: !apiEvent.visibilidade,
    g_localidade_id: apiEvent.g_localidade?.id,
    g_ambiente_predial_id: apiEvent.g_ambiente_predial?.id,
    g_categoria_organizacao_id: apiEvent.g_categoria_organizacao?.id,
    a_tipo_evento_id: apiEvent.a_tipo_evento?.id,
    g_status_id: apiEvent.g_status?.id,
    g_organizacao_id: apiEvent.g_organizacao?.id,
    usuario_id: apiEvent.usuario?.id,
  };
}

export function convertFrontendEventToApi(
  event: EventType
): CreateEventoRequest {
  return {
    titulo: event.title,
    assunto: event.assunto || event.title,
    data_hora_inicio: event.start.toISOString(),
    data_hora_fim: event.end.toISOString(),
    observacao: event.description ?? event.observacao ?? undefined,
    publico_alvo:
      event.targetAudience?.filter(Boolean).join(", ") ||
      event.publico_alvo ||
      "",
    visibilidade:
      event.visibilidade !== undefined ? event.visibilidade : !event.isPrivate,
    // CORREÇÃO: Garantir que os IDs sejam enviados corretamente
    g_localidade_id: event.g_localidade_id || undefined,
    g_ambiente_predial_id: event.g_ambiente_predial_id || undefined,
    g_categoria_organizacao_id: event.g_categoria_organizacao_id || undefined,
    a_tipo_evento_id: event.a_tipo_evento_id || undefined,
    g_status_id: event.g_status_id || 1, // Default para status "confirmado"
    g_organizacao_id: event.g_organizacao_id || undefined,
    usuario_id: event.usuario_id || undefined,
  };
}
