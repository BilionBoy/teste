"use client";

import {
  Building,
  MapPin,
  Users,
  Target,
  Briefcase,
  Filter,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

type FilterOption =
  | { id: string | number; name?: string; descricao?: string }
  | string;

interface FilterBarProps {
  organizations: FilterOption[];
  locations: FilterOption[];
  environments: FilterOption[];
  users: FilterOption[];
  targetAudiences: FilterOption[];
  filters: {
    organization: string;
    location: string;
    environment: string;
    user: string;
    targetAudience: string;
  };
  onFilterChange: (
    filterType:
      | "organization"
      | "location"
      | "environment"
      | "user"
      | "targetAudience",
    value: string
  ) => void;
}

export default function FilterBar({
  organizations,
  locations,
  environments,
  users,
  targetAudiences,
  filters,
  onFilterChange,
}: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter((value) => value && value !== "")
      .length;
  };

  const clearFilter = (filterType: keyof typeof filters) => {
    onFilterChange(filterType, "");
  };

  // Desktop version - manter design original
  const DesktopFilters = () => (
    <div className="hidden md:block bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organização
          </label>
          <Select
            value={filters.organization}
            onValueChange={(value) => onFilterChange("organization", value)}
          >
            <SelectTrigger className="w-full">
              <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue placeholder="Selecione uma organização" />
            </SelectTrigger>
            <SelectContent>
              {(Array.isArray(organizations) ? organizations : []).map(
                (organization) => {
                  const key =
                    typeof organization === "string"
                      ? organization
                      : String(organization.id);
                  const label =
                    typeof organization === "string"
                      ? organization
                      : organization.name || organization.descricao || "";
                  return (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  );
                }
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Localidade
          </label>
          <Select
            value={filters.location}
            onValueChange={(value) => onFilterChange("location", value)}
          >
            <SelectTrigger className="w-full">
              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue placeholder="Selecione uma localidade" />
            </SelectTrigger>
            <SelectContent>
              {(Array.isArray(locations) ? locations : []).map((location) => {
                const key =
                  typeof location === "string" ? location : String(location.id);
                const label =
                  typeof location === "string"
                    ? location
                    : location.name || location.descricao || "";
                return (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ambiente
          </label>
          <Select
            value={filters.environment}
            onValueChange={(value) => onFilterChange("environment", value)}
          >
            <SelectTrigger className="w-full">
              <Building className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue placeholder="Selecione um ambiente" />
            </SelectTrigger>
            <SelectContent>
              {(Array.isArray(environments) ? environments : []).map(
                (environment) => {
                  const key =
                    typeof environment === "string"
                      ? environment
                      : String(environment.id);
                  const label =
                    typeof environment === "string"
                      ? environment
                      : environment.name || environment.descricao || "";
                  return (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  );
                }
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Usuário
          </label>
          <Select
            value={filters.user}
            onValueChange={(value) => onFilterChange("user", value)}
          >
            <SelectTrigger className="w-full">
              <Users className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue placeholder="Selecione um usuário" />
            </SelectTrigger>
            <SelectContent>
              {(Array.isArray(users) ? users : []).map((user) => {
                const key = typeof user === "string" ? user : String(user.id);
                const label =
                  typeof user === "string"
                    ? user
                    : user.name || user.descricao || "";
                return (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Público Alvo
          </label>
          <Select
            value={filters.targetAudience}
            onValueChange={(value) => onFilterChange("targetAudience", value)}
          >
            <SelectTrigger className="w-full">
              <Target className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue placeholder="Selecione um público alvo" />
            </SelectTrigger>
            <SelectContent>
              {(Array.isArray(targetAudiences) ? targetAudiences : []).map(
                (targetAudience) => {
                  const key =
                    typeof targetAudience === "string"
                      ? targetAudience
                      : String(targetAudience.id);
                  const label =
                    typeof targetAudience === "string"
                      ? targetAudience
                      : targetAudience.name || targetAudience.descricao || "";
                  return (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  );
                }
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  // Mobile version - melhorada
  const MobileFilters = () => (
    <div className="md:hidden mb-2">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="relative justify-start h-8 text-xs"
          >
            <Filter className="h-3 w-3 mr-1" />
            <span className="text-xs">Filtros</span>
            {getActiveFiltersCount() > 0 && (
              <Badge
                variant="secondary"
                className="ml-auto h-4 w-4 p-0 text-[10px]"
              >
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader>
            <SheetTitle>Filtros</SheetTitle>
            <SheetDescription>Filtre os eventos por categoria</SheetDescription>
          </SheetHeader>
          <div className="py-4 space-y-6 overflow-y-auto">
            {/* Filtros mobile com mesmo design do desktop */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Organização
              </label>
              <Select
                value={filters.organization}
                onValueChange={(value) => onFilterChange("organization", value)}
              >
                <SelectTrigger>
                  <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Selecione uma organização" />
                </SelectTrigger>
                <SelectContent>
                  {organizations.map((org) => {
                    const key = typeof org === "string" ? org : String(org.id);
                    const label =
                      typeof org === "string"
                        ? org
                        : org.name || org.descricao || "";
                    return (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Repetir para outros filtros... */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Localidade
              </label>
              <Select
                value={filters.location}
                onValueChange={(value) => onFilterChange("location", value)}
              >
                <SelectTrigger>
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Selecione uma localidade" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => {
                    const key = typeof loc === "string" ? loc : String(loc.id);
                    const label =
                      typeof loc === "string"
                        ? loc
                        : loc.name || loc.descricao || "";
                    return (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Ambiente
              </label>
              <Select
                value={filters.environment}
                onValueChange={(value) => onFilterChange("environment", value)}
              >
                <SelectTrigger>
                  <Building className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Selecione um ambiente" />
                </SelectTrigger>
                <SelectContent>
                  {environments.map((env) => {
                    const key = typeof env === "string" ? env : String(env.id);
                    const label =
                      typeof env === "string"
                        ? env
                        : env.name || env.descricao || "";
                    return (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Usuário
              </label>
              <Select
                value={filters.user}
                onValueChange={(value) => onFilterChange("user", value)}
              >
                <SelectTrigger>
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Selecione um usuário" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => {
                    const key =
                      typeof user === "string" ? user : String(user.id);
                    const label =
                      typeof user === "string"
                        ? user
                        : user.name || user.descricao || "";
                    return (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Público Alvo
              </label>
              <Select
                value={filters.targetAudience}
                onValueChange={(value) =>
                  onFilterChange("targetAudience", value)
                }
              >
                <SelectTrigger>
                  <Target className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Selecione um público alvo" />
                </SelectTrigger>
                <SelectContent>
                  {targetAudiences.map((target) => {
                    const key =
                      typeof target === "string" ? target : String(target.id);
                    const label =
                      typeof target === "string"
                        ? target
                        : target.name || target.descricao || "";
                    return (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Active filters display */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {Object.entries(filters).map(([key, value]) => {
            if (!value) return null;
            return (
              <Badge key={key} variant="secondary" className="text-xs">
                {value}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-1 h-4 w-4 p-0"
                  onClick={() => clearFilter(key as keyof typeof filters)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <>
      <DesktopFilters />
      <MobileFilters />
    </>
  );
}
