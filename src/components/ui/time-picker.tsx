"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, set } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  date: Date;
  setDate: (date: Date) => void;
  className?: string;
}

export function TimePickerDemo({ date, setDate, className }: TimePickerProps) {
  const minuteRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const [hour, setHour] = useState<string>(
    date.getHours().toString().padStart(2, "0")
  );
  const [minute, setMinute] = useState<string>(
    date.getMinutes().toString().padStart(2, "0")
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setHour(date.getHours().toString().padStart(2, "0"));
    setMinute(date.getMinutes().toString().padStart(2, "0"));
  }, [date]);

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Permite apenas números e limita a 2 dígitos
    if (/^\d{0,2}$/.test(value)) {
      setHour(value);
    }
  };

  const handleHourBlur = () => {
    let numericValue = parseInt(hour, 10);

    if (isNaN(numericValue)) {
      numericValue = date.getHours();
    } else if (numericValue > 23) {
      numericValue = 23;
    } else if (numericValue < 0) {
      numericValue = 0;
    }

    const formattedValue = numericValue.toString().padStart(2, "0");
    setHour(formattedValue);
    const newDate = set(date, { hours: numericValue });
    setDate(newDate);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Permite apenas números e limita a 2 dígitos
    if (/^\d{0,2}$/.test(value)) {
      setMinute(value);
    }
  };

  const handleMinuteBlur = () => {
    let numericValue = parseInt(minute, 10);

    if (isNaN(numericValue)) {
      numericValue = date.getMinutes();
    } else if (numericValue > 59) {
      numericValue = 59;
    } else if (numericValue < 0) {
      numericValue = 0;
    }

    const formattedValue = numericValue.toString().padStart(2, "0");
    setMinute(formattedValue);
    const newDate = set(date, { minutes: numericValue });
    setDate(newDate);
  };

  const timeOptions = [
    { label: "08:00", hours: 8, minutes: 0 },
    { label: "09:00", hours: 9, minutes: 0 },
    { label: "12:00", hours: 12, minutes: 0 },
    { label: "13:00", hours: 13, minutes: 0 },
    { label: "17:00", hours: 17, minutes: 0 },
    { label: "18:00", hours: 18, minutes: 0 },
  ];

  const setTimeOption = (hours: number, minutes: number) => {
    const newDate = set(date, { hours, minutes });
    setDate(newDate);
    setHour(hours.toString().padStart(2, "0"));
    setMinute(minutes.toString().padStart(2, "0"));
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal ",
            !date && "text-muted-foreground",
            className
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {format(date, "HH:mm", { locale: ptBR })}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="space-y-4">
          <div className="flex items-end gap-2">
            <div className="grid gap-1 text-center">
              <Label htmlFor="hours" className="text-xs">
                Horas
              </Label>
              <Input
                ref={hourRef}
                id="hours"
                className="w-20 h-10 text-center text-lg"
                value={hour}
                onChange={handleHourChange}
                onBlur={handleHourBlur}
                maxLength={2}
                onClick={(e) => e.currentTarget.select()}
                placeholder="00"
              />
            </div>
            <div className="text-2xl pb-1">:</div>
            <div className="grid gap-1 text-center">
              <Label htmlFor="minutes" className="text-xs">
                Minutos
              </Label>
              <Input
                ref={minuteRef}
                id="minutes"
                className="w-20 h-10 text-center text-lg"
                value={minute}
                onChange={handleMinuteChange}
                onBlur={handleMinuteBlur}
                maxLength={2}
                onClick={(e) => e.currentTarget.select()}
                placeholder="00"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {timeOptions.map((option) => (
              <Button
                key={option.label}
                variant="outline"
                size="sm"
                className="text-xs h-8"
                onClick={() => setTimeOption(option.hours, option.minutes)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
