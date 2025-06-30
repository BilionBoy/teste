"use client";

import * as React from "react";
import { ChevronsUpDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type Person = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

interface MultiSelectProps {
  people: Person[];
  selectedPeople: Person[];
  setSelectedPeople: (people: Person[]) => void;
  placeholder?: string;
}

export function MultiSelect({
  people,
  selectedPeople,
  setSelectedPeople,
  placeholder = "Selecionar pessoas...",
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const handleSelect = (person: Person) => {
    // Verifica se a pessoa já está selecionada
    if (!selectedPeople.some((p) => p.id === person.id)) {
      setSelectedPeople([...selectedPeople, person]);
    }
    setSearch("");
  };

  const handleRemove = (personId: string) => {
    setSelectedPeople(selectedPeople.filter((p) => p.id !== personId));
  };

  // Filtra pessoas disponíveis (não selecionadas)
  const availablePeople = people.filter(
    (person) => !selectedPeople.some((p) => p.id === person.id)
  );

  // Filtra pessoas com base na busca
  const filteredPeople = availablePeople.filter(
    (person) =>
      person.name.toLowerCase().includes(search.toLowerCase()) ||
      person.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 mb-2">
        {selectedPeople.map((person) => (
          <Badge
            key={person.id}
            variant="secondary"
            className="rounded-sm px-1 py-1 font-normal"
          >
            {person.name}
            <button
              type="button"
              className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={() => handleRemove(person.id)}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        ))}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedPeople.length > 0
              ? `${selectedPeople.length} participante${
                  selectedPeople.length !== 1 ? "s" : ""
                } selecionado${selectedPeople.length !== 1 ? "s" : ""}`
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="Buscar pessoa..."
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>Nenhuma pessoa encontrada.</CommandEmpty>
              <CommandGroup>
                {filteredPeople.map((person) => (
                  <CommandItem
                    key={person.id}
                    value={person.id}
                    onSelect={() => {
                      handleSelect(person);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    {person.avatar ? (
                      <img
                        src={person.avatar || "/placeholder.svg"}
                        alt={person.name}
                        className="h-6 w-6 rounded-full"
                      />
                    ) : (
                      <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                        {person.name.charAt(0)}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span>{person.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {person.email}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
