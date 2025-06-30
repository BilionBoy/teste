"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { format, parse } from "date-fns";
import {
  Plus,
  Building,
  MapPin,
  Briefcase,
  Target,
  Loader2,
  Clock,
  FileText,
} from "lucide-react";
import type { EventType } from "@/lib/types";
import { useReferenceData } from "@/hooks/useReferenceData";
import { TimePickerDemo } from "@/components/ui/time-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { convertFrontendEventToApi } from "@/lib/types";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: EventType & { colorClass?: string }) => void;
  onDelete: (id: string) => void;
  event: EventType | null;
  selectedDates: { start: Date | null; end: Date | null };
}

// Mapeamento de tipos de evento para classes de cor
const EVENT_TYPE_COLORS: Record<string, string> = {
  "1": "event-purple", // Curso
  "2": "event-orange", // Palestra
  "3": "event-green", // Workshop
  "4": "event-blue", // Reunião
  "5": "event-red", // Seminário
  "6": "event-yellow", // Conferência
};

export default function EventModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  event,
  selectedDates,
}: EventModalProps) {
  // Hook para dados de referência
  const {
    localidades,
    ambientesPrediais,
    organizacoes,
    tiposEvento,
    loading: loadingRef,
    error: errorRef,
  } = useReferenceData();

  // Log para verificar os dados recebidos do hook
  console.log("EventModal - dados recebidos:", {
    localidades,
    ambientesPrediais,
    organizacoes,
    tiposEvento,
    loadingRef,
    errorRef,
  });

  // Estados básicos do formulário
  const [title, setTitle] = useState("");
  const [assunto, setAssunto] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState(new Date());
  const [showEndTime, setShowEndTime] = useState(false);
  const [publicoAlvo, setPublicoAlvo] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [saving, setSaving] = useState(false);

  // Estados para campos de referência
  const [selectedLocalidade, setSelectedLocalidade] = useState<string>("");
  const [selectedAmbiente, setSelectedAmbiente] = useState<string>("");
  const [selectedOrganizacao, setSelectedOrganizacao] = useState<string>("");
  const [selectedTipoEvento, setSelectedTipoEvento] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("1"); // Default: Confirmado

  // Estados para público alvo (múltiplos)
  const [targetAudience, setTargetAudience] = useState<string[]>([]);
  const [selectedAudience, setSelectedAudience] = useState("");

  // Dados para público alvo
  const TARGET_AUDIENCES = [
    "Professores",
    "Coordenadores",
    "Diretores",
    "Secretários",
    "Estudantes",
    "Profissionais da Saúde",
  ];

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setAssunto(event.assunto || event.title);
      setDescription(event.description || "");
      setStartDate(format(new Date(event.start), "yyyy-MM-dd"));
      setStartTime(new Date(event.start));
      setEndDate(format(new Date(event.end), "yyyy-MM-dd"));
      setEndTime(new Date(event.end));
      setShowEndTime(true);
      setPublicoAlvo(event.publico_alvo || "");
      setIsPrivate(!event.visibilidade);
      setTargetAudience(event.targetAudience || []);

      // Campos de referência
      setSelectedLocalidade(event.g_localidade_id?.toString() || "");
      setSelectedAmbiente(event.g_ambiente_predial_id?.toString() || "");
      setSelectedOrganizacao(event.g_organizacao_id?.toString() || "");
      setSelectedTipoEvento(event.a_tipo_evento_id?.toString() || "");
      setSelectedStatus(event.g_status_id?.toString() || "1");
    } else if (selectedDates.start && selectedDates.end) {
      setTitle("");
      setAssunto("");
      setDescription("");
      setStartDate(format(selectedDates.start, "yyyy-MM-dd"));
      setStartTime(selectedDates.start);
      setEndDate(format(selectedDates.end, "yyyy-MM-dd"));
      setEndTime(selectedDates.end);
      setShowEndTime(false);
      setPublicoAlvo("");
      setIsPrivate(false);
      setTargetAudience([]);

      // Reset campos de referência
      setSelectedLocalidade("");
      setSelectedAmbiente("");
      setSelectedOrganizacao("");
      setSelectedTipoEvento("");
      setSelectedStatus("1");
    }
  }, [event, selectedDates, isOpen]);

  // Verificar se os dados têm a estrutura esperada
  useEffect(() => {
    if (localidades && localidades.length > 0) {
      console.log("Exemplo de localidade:", localidades[0]);
    }
    if (ambientesPrediais && ambientesPrediais.length > 0) {
      console.log("Exemplo de ambiente predial:", ambientesPrediais[0]);
    }
    if (organizacoes && organizacoes.length > 0) {
      console.log("Exemplo de organização:", organizacoes[0]);
    }
    if (tiposEvento && tiposEvento.length > 0) {
      console.log("Exemplo de tipo de evento:", tiposEvento[0]);
    }
  }, [localidades, ambientesPrediais, organizacoes, tiposEvento]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("O título do evento é obrigatório");
      return;
    }

    setSaving(true);

    try {
      const startDateObj = parse(startDate, "yyyy-MM-dd", new Date());
      const startDateTime = new Date(
        startDateObj.getFullYear(),
        startDateObj.getMonth(),
        startDateObj.getDate(),
        startTime.getHours(),
        startTime.getMinutes()
      );

      let endDateTime: Date;

      if (showEndTime) {
        const endDateObj = parse(endDate, "yyyy-MM-dd", new Date());
        endDateTime = new Date(
          endDateObj.getFullYear(),
          endDateObj.getMonth(),
          endDateObj.getDate(),
          endTime.getHours(),
          endTime.getMinutes()
        );
      } else {
        endDateTime = new Date(startDateTime);
        endDateTime.setHours(endDateTime.getHours() + 1);
      }

      // Validar se a data de fim é posterior à de início
      if (endDateTime <= startDateTime) {
        alert("A data/hora de término deve ser posterior à de início");
        return;
      }

      // Determinar cor baseada no tipo de evento
      const colorClass = selectedTipoEvento
        ? EVENT_TYPE_COLORS[selectedTipoEvento] || "event-blue"
        : "event-blue";

      const eventData: EventType & { colorClass?: string } = {
        id: event?.id || "",
        title: title.trim(),
        description: description.trim(),
        start: startDateTime,
        end: endDateTime,
        colorClass,
        eventType:
          tiposEvento.find((t) => t.id.toString() === selectedTipoEvento)
            ?.descricao || "Curso",
        building: true,
        // Campos para a API Rails
        assunto: assunto.trim() || title.trim(),
        observacao: description.trim(),
        publico_alvo:
          targetAudience.length > 0
            ? targetAudience.join(", ")
            : publicoAlvo.trim(),
        visibilidade: !isPrivate,
        targetAudience,
        // Dados de localização
        location:
          selectedLocalidade &&
          localidades.find((l) => l.id.toString() === selectedLocalidade)
            ? {
                id: selectedLocalidade,
                name:
                  localidades.find(
                    (l) => l.id.toString() === selectedLocalidade
                  )?.descricao || "",
                ambiente: ambientesPrediais.find(
                  (a) => a.id.toString() === selectedAmbiente
                )?.descricao,
              }
            : undefined,
        organization: organizacoes.find(
          (o) => o.id.toString() === selectedOrganizacao
        )?.descricao,
        // IDs para relacionamentos
        g_localidade_id: selectedLocalidade
          ? Number.parseInt(selectedLocalidade)
          : undefined,
        g_ambiente_predial_id: selectedAmbiente
          ? Number.parseInt(selectedAmbiente)
          : undefined,
        g_organizacao_id: selectedOrganizacao
          ? Number.parseInt(selectedOrganizacao)
          : undefined,
        a_tipo_evento_id: selectedTipoEvento
          ? Number.parseInt(selectedTipoEvento)
          : undefined,
        g_status_id: selectedStatus
          ? Number.parseInt(selectedStatus)
          : undefined,
      };

      console.log("=== DEBUG: Dados do evento antes de salvar ===");
      console.log("Event data:", eventData);
      console.log("Selected values:", {
        selectedLocalidade,
        selectedAmbiente,
        selectedOrganizacao,
        selectedTipoEvento,
        selectedStatus,
      });
      console.log("Available data:", {
        localidades: localidades?.slice(0, 3),
        ambientesPrediais: ambientesPrediais?.slice(0, 3),
        organizacoes: organizacoes?.slice(0, 3),
        tiposEvento: tiposEvento?.slice(0, 3),
      });
      console.log("Converted to API:", convertFrontendEventToApi(eventData));
      console.log("=== FIM DEBUG ===");

      console.log("Dados do evento para salvar:", eventData);
      await onSave(eventData);

      // Resetar formulário após salvar
      setTitle("");
      setAssunto("");
      setDescription("");
      setPublicoAlvo("");
      setIsPrivate(false);
      setTargetAudience([]);
      setSelectedLocalidade("");
      setSelectedAmbiente("");
      setSelectedOrganizacao("");
      setSelectedTipoEvento("");
      setSelectedStatus("1");
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
      alert("Erro ao salvar evento. Verifique o console para mais detalhes.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (event && confirm("Tem certeza que deseja excluir este evento?")) {
      try {
        await onDelete(event.id);
      } catch (error) {
        console.error("Erro ao excluir evento:", error);
        alert("Erro ao excluir evento. Tente novamente.");
      }
    }
  };

  const handleAddAudience = () => {
    if (selectedAudience && !targetAudience.includes(selectedAudience)) {
      setTargetAudience([...targetAudience, selectedAudience]);
      setSelectedAudience("");
    }
  };

  const handleRemoveAudience = (audience: string) => {
    setTargetAudience(targetAudience.filter((item) => item !== audience));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {event ? "Editar Evento" : "Adicionar Evento"}
          </DialogTitle>
        </DialogHeader>
        {errorRef && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <p className="text-red-800 text-sm">
              Erro ao carregar dados: {errorRef}
            </p>
          </div>
        )}

        <ScrollArea className="max-h-[70vh] pr-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título do evento"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assunto">Assunto</Label>
              <Input
                id="assunto"
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
                placeholder="Assunto do evento"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventType" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Tipo de Evento
              </Label>
              <Select
                value={selectedTipoEvento}
                onValueChange={setSelectedTipoEvento}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      loadingRef ? "Carregando..." : "Selecione o tipo"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {(tiposEvento ?? []).map((tipo) => {
                    console.log("Renderizando tipo de evento:", tipo);
                    return (
                      <SelectItem key={String(tipo.id)} value={String(tipo.id)}>
                        {tipo.descricao}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Data de Início
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startTime">Hora de Início</Label>
                <TimePickerDemo date={startTime} setDate={setStartTime} />
              </div>
            </div>

            {showEndTime ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="endDate">Data de Término</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">Hora de Término</Label>
                  <TimePickerDemo date={endTime} setDate={setEndTime} />
                </div>
              </div>
            ) : (
              <Button
                type="button"
                variant="ghost"
                className="text-primary gap-2 px-0 hover:bg-transparent"
                onClick={() => setShowEndTime(true)}
              >
                <Plus size={16} />
                Definir hora de término
              </Button>
            )}

            <div className="space-y-2">
              <Label htmlFor="organization" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Organização
              </Label>
              <Select
                value={selectedOrganizacao}
                onValueChange={setSelectedOrganizacao}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      loadingRef ? "Carregando..." : "Selecione uma organização"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {(organizacoes ?? [])
                    .filter(
                      (org) =>
                        org.id !== undefined && org.id !== null && org.id !== 0
                    )
                    .map((org) => {
                      console.log("Renderizando organização:", org);
                      return (
                        <SelectItem key={String(org.id)} value={String(org.id)}>
                          {org.descricao}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Localidade
                </Label>
                <Select
                  value={selectedLocalidade}
                  onValueChange={setSelectedLocalidade}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        loadingRef
                          ? "Carregando..."
                          : "Selecione uma localidade"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {(localidades ?? [])
                      .filter(
                        (loc) =>
                          loc.id !== undefined &&
                          loc.id !== null &&
                          loc.id !== 0
                      )
                      .map((loc) => {
                        console.log("Renderizando localidade:", loc);
                        return (
                          <SelectItem
                            key={String(loc.id)}
                            value={String(loc.id)}
                          >
                            {loc.descricao}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="environment"
                  className="flex items-center gap-2"
                >
                  <Building className="h-4 w-4" />
                  Ambiente
                </Label>
                <Select
                  value={selectedAmbiente}
                  onValueChange={setSelectedAmbiente}
                  disabled={!selectedLocalidade}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        loadingRef ? "Carregando..." : "Selecione um ambiente"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {ambientesPrediais
                      .filter(
                        (env) =>
                          env.id !== undefined &&
                          env.id !== null &&
                          env.id !== 0
                      )
                      .map((env) => {
                        console.log("Renderizando ambiente:", env);
                        return (
                          <SelectItem
                            key={String(env.id)}
                            value={String(env.id)}
                          >
                            {env.descricao}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="targetAudience"
                className="flex items-center gap-2"
              >
                <Target className="h-4 w-4" />
                Público Alvo
              </Label>
              <div className="flex gap-2">
                <Select
                  value={selectedAudience}
                  onValueChange={setSelectedAudience}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um público alvo" />
                  </SelectTrigger>
                  <SelectContent>
                    {TARGET_AUDIENCES.map((audience) => (
                      <SelectItem key={audience} value={audience}>
                        {audience}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={handleAddAudience}
                  disabled={!selectedAudience}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {targetAudience.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {targetAudience.map((audience) => (
                    <Badge
                      key={audience}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {audience}
                      <button
                        type="button"
                        className="ml-1 rounded-full hover:bg-muted p-0.5"
                        onClick={() => handleRemoveAudience(audience)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6 6 18"></path>
                          <path d="m6 6 12 12"></path>
                        </svg>
                        <span className="sr-only">Remover {audience}</span>
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="publicoAlvo">Público Alvo (Texto Livre)</Label>
              <Input
                id="publicoAlvo"
                value={publicoAlvo}
                onChange={(e) => setPublicoAlvo(e.target.value)}
                placeholder="Ex: Nutricionistas, estudantes e profissionais da saúde"
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="isPrivate" className="flex-grow">
                Evento Privado
              </Label>
              <Switch
                id="isPrivate"
                checked={isPrivate}
                onCheckedChange={setIsPrivate}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição do evento"
                rows={3}
              />
            </div>

            <div className="flex justify-between pt-4">
              {event && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={saving}
                >
                  Excluir
                </Button>
              )}
              <div className="flex gap-2 ml-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={saving}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={saving || loadingRef}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    "Salvar"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
