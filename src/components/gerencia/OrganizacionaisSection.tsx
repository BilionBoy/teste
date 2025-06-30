"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Calendar,
  TrendingUp,
  Building2,
  GraduationCap,
  Heart,
  DollarSign,
  UserCheck,
  ChevronRight,
  Star,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

const departments = [
  {
    id: 1,
    name: "Departamento de Educação",
    icon: GraduationCap,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    coordinators: 8,
    events: 24,
    efficiency: 92,
    budget: "R$ 2.5M",
    status: "Excelente",
    description: "Responsável por programas educacionais e treinamentos",
    recentActivity: "Novo curso de capacitação aprovado",
    team: [
      {
        name: "Ana Silva",
        role: "Coordenadora Geral",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        name: "Carlos Santos",
        role: "Coord. Pedagógico",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        name: "Maria Oliveira",
        role: "Coord. Técnico",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 2,
    name: "Departamento de Saúde",
    icon: Heart,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    coordinators: 6,
    events: 18,
    efficiency: 88,
    budget: "R$ 1.8M",
    status: "Muito Bom",
    description: "Gestão de programas de saúde e bem-estar",
    recentActivity: "Campanha de vacinação iniciada",
    team: [
      {
        name: "Dr. João Pereira",
        role: "Coordenador Médico",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        name: "Enf. Paula Costa",
        role: "Coord. Enfermagem",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 3,
    name: "Departamento de Infraestrutura",
    icon: Building2,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    coordinators: 5,
    events: 12,
    efficiency: 85,
    budget: "R$ 3.2M",
    status: "Bom",
    description: "Manutenção e desenvolvimento de infraestrutura",
    recentActivity: "Reforma do auditório concluída",
    team: [
      {
        name: "Eng. Roberto Lima",
        role: "Coordenador Geral",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        name: "Arq. Fernanda Rocha",
        role: "Coord. Projetos",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 4,
    name: "Departamento de Finanças",
    icon: DollarSign,
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-600",
    coordinators: 4,
    events: 8,
    efficiency: 95,
    budget: "R$ 1.2M",
    status: "Excelente",
    description: "Gestão financeira e orçamentária",
    recentActivity: "Relatório trimestral aprovado",
    team: [
      {
        name: "Cont. Sandra Alves",
        role: "Coordenadora Financeira",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        name: "Adm. Lucas Ferreira",
        role: "Coord. Orçamento",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 5,
    name: "Departamento de Recursos Humanos",
    icon: UserCheck,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    coordinators: 3,
    events: 15,
    efficiency: 90,
    budget: "R$ 800K",
    status: "Muito Bom",
    description: "Gestão de pessoas e desenvolvimento profissional",
    recentActivity: "Programa de mentoria lançado",
    team: [
      {
        name: "Psic. Amanda Torres",
        role: "Coordenadora RH",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        name: "Adm. Rafael Souza",
        role: "Coord. Desenvolvimento",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
];

export default function DepartmentsSection() {
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );

  return (
    <div className="space-y-6">
      {/* Header com estatísticas gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Gerências</p>
                  <p className="text-2xl font-bold">{departments.length}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Coordenadores</p>
                  <p className="text-2xl font-bold">
                    {departments.reduce(
                      (acc, dept) => acc + dept.coordinators,
                      0
                    )}
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Eventos Ativos</p>
                  <p className="text-2xl font-bold">
                    {departments.reduce((acc, dept) => acc + dept.events, 0)}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Eficiência Média</p>
                  <p className="text-2xl font-bold">
                    {Math.round(
                      departments.reduce(
                        (acc, dept) => acc + dept.efficiency,
                        0
                      ) / departments.length
                    )}
                    %
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Lista de Gerência Organizacional */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {departments.map((dept, index) => {
          const IconComponent = dept.icon;
          return (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card
                className={`hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 ${
                  selectedDepartment === dept.id
                    ? "ring-2 ring-blue-500 shadow-lg"
                    : ""
                }`}
                onClick={() =>
                  setSelectedDepartment(
                    selectedDepartment === dept.id ? null : dept.id
                  )
                }
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-r ${dept.color}`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold">
                          {dept.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {dept.description}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        dept.efficiency >= 90
                          ? "default"
                          : dept.efficiency >= 85
                          ? "secondary"
                          : "outline"
                      }
                      className="flex items-center gap-1"
                    >
                      <Star className="h-3 w-3" />
                      {dept.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Métricas principais */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-2xl font-bold">
                          {dept.coordinators}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Coordenadores
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-2xl font-bold">
                          {dept.events}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Eventos</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-lg font-bold">{dept.budget}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Orçamento</p>
                    </div>
                  </div>

                  {/* Barra de eficiência */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Eficiência</span>
                      <span className="text-sm text-muted-foreground">
                        {dept.efficiency}%
                      </span>
                    </div>
                    <Progress value={dept.efficiency} className="h-2" />
                  </div>

                  {/* Atividade recente */}
                  <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{dept.recentActivity}</span>
                  </div>

                  {/* Seção expandida */}
                  {selectedDepartment === dept.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 pt-4 border-t"
                    >
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Equipe Principal
                        </h4>
                        <div className="space-y-2">
                          {dept.team.map((member, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50"
                            >
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={member.avatar || "/placeholder.svg"}
                                />
                                <AvatarFallback>
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">
                                  {member.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {member.role}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          Ver Detalhes
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Relatório
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
