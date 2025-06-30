"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Calendar,
  MapPin,
  Target,
  FileText,
  Download,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const reportTypes = [
  {
    id: 1,
    title: "Relatório de Eventos por Departamento",
    description:
      "Análise detalhada da distribuição de eventos entre Gerência Organizacional",
    icon: BarChart3,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    category: "Departamental",
    estimatedTime: "2-3 min",
    lastGenerated: "Há 2 dias",
    status: "updated",
    insights: [
      "Educação lidera com 35% dos eventos",
      "Crescimento de 12% no último mês",
    ],
    dataPoints: 1247,
  },
  {
    id: 2,
    title: "Relatório de Utilização de Espaços",
    description: "Visualize a ocupação e utilização de ambientes e localidades",
    icon: MapPin,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    category: "Infraestrutura",
    estimatedTime: "1-2 min",
    lastGenerated: "Há 1 dia",
    status: "updated",
    insights: [
      "Auditório principal: 85% ocupação",
      "Salas de reunião subutilizadas",
    ],
    dataPoints: 892,
  },
  {
    id: 3,
    title: "Relatório de Eventos por Período",
    description: "Análise temporal de eventos com tendências e sazonalidade",
    icon: Calendar,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    category: "Temporal",
    estimatedTime: "3-4 min",
    lastGenerated: "Há 3 horas",
    status: "fresh",
    insights: [
      "Pico de eventos em março",
      "Terças-feiras são mais movimentadas",
    ],
    dataPoints: 2156,
  },
  {
    id: 4,
    title: "Relatório de Público Alvo",
    description: "Segmentação e análise de participação por público alvo",
    icon: Target,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
    category: "Audiência",
    estimatedTime: "2-3 min",
    lastGenerated: "Há 5 dias",
    status: "outdated",
    insights: [
      "Professores: maior engajamento",
      "Estudantes: crescimento de 25%",
    ],
    dataPoints: 3421,
  },
  {
    id: 5,
    title: "Dashboard Executivo",
    description: "Visão geral com KPIs e métricas principais para gestão",
    icon: TrendingUp,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    category: "Executivo",
    estimatedTime: "1 min",
    lastGenerated: "Há 30 min",
    status: "fresh",
    insights: ["ROI de eventos: +18%", "Satisfação média: 4.7/5"],
    dataPoints: 856,
  },
  {
    id: 6,
    title: "Análise de Performance",
    description: "Métricas de desempenho e eficiência operacional",
    icon: Zap,
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-600",
    category: "Performance",
    estimatedTime: "4-5 min",
    lastGenerated: "Há 1 semana",
    status: "outdated",
    insights: ["Tempo médio de setup: -15%", "Taxa de cancelamento: 2.1%"],
    dataPoints: 1789,
  },
];

const quickStats = [
  { label: "Relatórios Gerados", value: "1,247", change: "+12%", trend: "up" },
  { label: "Dados Processados", value: "2.4M", change: "+8%", trend: "up" },
  { label: "Insights Gerados", value: "89", change: "+23%", trend: "up" },
  { label: "Tempo Médio", value: "2.3min", change: "-15%", trend: "down" },
];

export default function ReportsSection() {
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [generatingReport, setGeneratingReport] = useState<number | null>(null);

  const handleGenerateReport = async (reportId: number) => {
    setGeneratingReport(reportId);
    // Simular geração de relatório
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setGeneratingReport(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "fresh":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "updated":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "outdated":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "fresh":
        return "bg-green-100 text-green-800";
      case "updated":
        return "bg-blue-100 text-blue-800";
      case "outdated":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header com estatísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="bg-gradient-to-br from-white to-gray-50 border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp
                        className={`h-3 w-3 mr-1 ${
                          stat.trend === "up"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      />
                      <span
                        className={`text-xs ${
                          stat.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Grid de relatórios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report, index) => {
          const IconComponent = report.icon;
          const isGenerating = generatingReport === report.id;
          const isSelected = selectedReport === report.id;

          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card
                className={`hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                  isSelected ? "ring-2 ring-blue-500 shadow-lg" : ""
                } ${isGenerating ? "animate-pulse" : ""}`}
                onClick={() => setSelectedReport(isSelected ? null : report.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${report.color} group-hover:scale-110 transition-transform`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {report.category}
                          </Badge>
                          <Badge
                            className={`text-xs ${getStatusColor(
                              report.status
                            )}`}
                          >
                            {getStatusIcon(report.status)}
                            <span className="ml-1 capitalize">
                              {report.status}
                            </span>
                          </Badge>
                        </div>
                        <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                          {report.title}
                        </CardTitle>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {report.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Métricas do relatório */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-2 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center space-x-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {report.estimatedTime}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Tempo estimado
                      </p>
                    </div>
                    <div className="p-2 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center space-x-1">
                        <BarChart3 className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {report.dataPoints.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Pontos de dados
                      </p>
                    </div>
                  </div>

                  {/* Última geração */}
                  <div className="text-center p-2 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      Última geração: {report.lastGenerated}
                    </p>
                  </div>

                  {/* Insights principais */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3 pt-3 border-t"
                    >
                      <h4 className="font-semibold text-sm">
                        Insights Principais:
                      </h4>
                      <div className="space-y-2">
                        {report.insights.map((insight, idx) => (
                          <div
                            key={idx}
                            className="flex items-start space-x-2 text-sm"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {insight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Botões de ação */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGenerateReport(report.id);
                      }}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2" />
                          Gerando...
                        </>
                      ) : (
                        <>
                          <Eye className="h-3 w-3 mr-1" />
                          Visualizar
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Seção de relatórios personalizados */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-indigo-600" />
            Relatórios Personalizados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Crie relatórios sob medida com filtros avançados e visualizações
            personalizadas
          </p>
          <div className="flex gap-3">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <PieChart className="h-4 w-4 mr-2" />
              Criar Relatório
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Templates
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
