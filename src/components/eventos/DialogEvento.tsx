"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimePickerDemo } from "@/components/ui/time-picker";
import type {
  CalendarEvent,
  EventType,
} from "@/components/calendario/CalendarioLayout";

interface EventDialogProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  onDelete: (eventId: string) => void;
}

export function EventDialog({
  event,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: EventDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [allDay, setAllDay] = useState(false);
  const [eventType, setEventType] = useState<EventType>("evento");

  // Função para converter string para Date de forma segura
  const safeParseDate = (dateStr: string | Date): Date => {
    if (dateStr instanceof Date) return dateStr;
    try {
      const date = new Date(dateStr);
      // Verificar se a data é válida
      if (isNaN(date.getTime())) {
        console.warn("Data inválida:", dateStr);
        return new Date(); // Fallback para data atual
      }
      return date;
    } catch (error) {
      console.error("Erro ao converter data:", error);
      return new Date(); // Fallback para data atual
    }
  };

  // Resetar formulário quando o evento mudar ou o diálogo abrir
  useEffect(() => {
    if (event && isOpen) {
      console.log("Carregando evento no diálogo:", event);

      // Definir título e descrição
      setTitle(event.title || "");
      setDescription(event.description || "");

      // Definir tipo de evento
      setEventType(event.eventType || "evento");

      // Definir se é dia inteiro
      setAllDay(event.allDay || false);

      try {
        // Converter datas para objetos Date
        const start = safeParseDate(event.start);
        const end = safeParseDate(event.end);

        // Definir datas
        setStartDate(start);
        setEndDate(end);
        setStartTime(start);
        setEndTime(end);
      } catch (error) {
        console.error("Erro ao processar datas:", error);

        // Fallback para datas atuais
        const now = new Date();
        const later = new Date(now.getTime() + 60 * 60 * 1000); // +1 hora
        setStartDate(now);
        setEndDate(later);
        setStartTime(now);
        setEndTime(later);
      }
    }
  }, [event, isOpen]);

  const handleSave = () => {
    if (!event) return;

    try {
      // Combinar data e hora
      const start = new Date(startDate);
      let end = new Date(endDate);

      if (!allDay) {
        // Para eventos com hora, usar as horas e minutos selecionados
        start.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0);
        end.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);
      } else {
        // Para eventos de dia inteiro, definir hora como 00:00
        start.setHours(0, 0, 0, 0);

        // Para eventos de dia inteiro, adicionar 1 dia à data final para compensar
        // o comportamento exclusivo do FullCalendar
        const nextDay = new Date(end);
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay.setHours(0, 0, 0, 0);
        end = nextDay;
      }

      // Verificar se a data final é anterior à data inicial
      if (end < start) {
        // Se for, definir a data final igual à data inicial
        end = new Date(start);
        if (!allDay) {
          // Adicionar 1 hora
          end.setHours(end.getHours() + 1);
        } else {
          // Adicionar 1 dia
          end.setDate(end.getDate() + 1);
        }
      }

      const updatedEvent: CalendarEvent = {
        ...event,
        title,
        description,
        start,
        end,
        allDay,
        eventType,
      };

      console.log("Salvando evento:", updatedEvent);
      onSave(updatedEvent);
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
      alert("Erro ao salvar evento. Verifique o console para mais detalhes.");
    }
  };

  const handleDelete = () => {
    if (event) {
      onDelete(event.id);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {event && event.title ? "Editar Atividade" : "Nova Atividade"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Adicione um título"
              className="h-10"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="eventType">Tipo de Atividade</Label>
            <Select
              value={eventType}
              onValueChange={(value) => setEventType(value as EventType)}
            >
              <SelectTrigger id="eventType" className="h-10">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="evento">Evento</SelectItem>
                <SelectItem value="reuniao">Reunião</SelectItem>
                <SelectItem value="palestra">Palestra</SelectItem>
                <SelectItem value="curso">Curso</SelectItem>
                <SelectItem value="aniversario">Aniversário</SelectItem>
                <SelectItem value="almoco">Almoço</SelectItem>
                <SelectItem value="jantar">Jantar</SelectItem>
                <SelectItem value="happy-hour">Happy Hour</SelectItem>
                <SelectItem value="treinamento">Treinamento</SelectItem>
                <SelectItem value="conferencia">Conferência</SelectItem>
                <SelectItem value="apresentacao">Apresentação</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Adicione uma descrição"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="all-day" checked={allDay} onCheckedChange={setAllDay} />
            <Label htmlFor="all-day">Dia inteiro</Label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Data de início</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal h-10"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate
                      ? format(startDate, "PPP", { locale: ptBR })
                      : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => date && setStartDate(date)}
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {!allDay && (
              <div className="grid gap-2">
                <Label>Hora de início</Label>
                <TimePickerDemo date={startTime} setDate={setStartTime} />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Data de término</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal h-10"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate
                      ? format(endDate, "PPP", { locale: ptBR })
                      : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => date && setEndDate(date)}
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {!allDay && (
              <div className="grid gap-2">
                <Label>Hora de término</Label>
                <TimePickerDemo date={endTime} setDate={setEndTime} />
              </div>
            )}
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          {event && event.title && (
            <Button variant="destructive" onClick={handleDelete} type="button">
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </Button>
          )}
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!title}>
              Salvar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
