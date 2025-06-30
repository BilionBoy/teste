"use client";

import Link from "next/link";
import {
  Calendar,
  ArrowRight,
  Users,
  Check,
  Plus,
  X,
  Bell,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

export default function Home() {
  const [animationStep, setAnimationStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [eventCreated, setEventCreated] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const sequence = [
      () => setAnimationStep(1),
      () => setAnimationStep(2),
      () => setAnimationStep(3),
      () => setShowModal(true),
      () => setAnimationStep(4),
      () => setFormData((prev) => ({ ...prev, title: "Reunião Pedagógica" })),
      () => setFormData((prev) => ({ ...prev, subject: "Planejamento Anual" })),
      () => setFormData((prev) => ({ ...prev, date: "25/06/2025" })),
      () => setFormData((prev) => ({ ...prev, time: "14:00" })),
      () => setAnimationStep(5),
      () => {
        setShowModal(false);
        setEventCreated(true);
        setAnimationStep(6);
      },
      () => setAnimationStep(7),
      () => {
        setTimeout(() => {
          setAnimationStep(8);
          setShowModal(false);
          setEventCreated(false);
          setFormData({ title: "", subject: "", date: "", time: "" });
        }, 3000);
      },
    ];

    const timeouts = [
      setTimeout(sequence[0], 800),
      setTimeout(sequence[1], 1800),
      setTimeout(sequence[2], 2800),
      setTimeout(sequence[3], 3300),
      setTimeout(sequence[4], 3800),
      setTimeout(sequence[5], 4300),
      setTimeout(sequence[6], 5100),
      setTimeout(sequence[7], 5900),
      setTimeout(sequence[8], 6700),
      setTimeout(sequence[9], 7200),
      setTimeout(sequence[10], 7700),
      setTimeout(sequence[11], 8700),
      setTimeout(sequence[12], 11000),
      setTimeout(() => {
        setAnimationStep(0);
      }, 14000),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header Responsivo com Hierarquia Visual */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <nav className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <Link href="/" className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[#315892] to-[#005BA8] rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
              </div>

              {/* Logo Responsivo */}
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-[#315892] tracking-tight font-sans leading-none">
                  AGENDA SEDUC
                </h1>
                <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider font-mono leading-none">
                  Sistema Oficial
                </p>
              </div>

              {/* Logo Mobile */}
              <div className="block sm:hidden">
                <h1 className="text-base font-black text-[#315892] tracking-tight font-sans">
                  SEDUC
                </h1>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/home">
              <Button className="bg-gradient-to-r from-[#315892] to-[#005BA8] hover:from-[#005BA8] hover:to-[#315892] text-white font-bold px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-2.5 text-xs sm:text-sm lg:text-base rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <span className="hidden sm:inline">Acessar Sistema</span>
                <span className="sm:hidden">Entrar</span>
                <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section com Hierarquia Visual Aprimorada */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#315892] via-[#005BA8] to-[#1e3a5f] min-h-screen flex items-center">
          {/* Background Elements Responsivos */}
          <div className="absolute inset-0">
            <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 h-32 sm:w-72 sm:h-72 bg-white/5 rounded-full blur-2xl sm:blur-3xl"></div>
            <div className="absolute top-20 sm:top-40 right-10 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 bg-[#FED22F]/10 rounded-full blur-2xl sm:blur-3xl"></div>
            <div className="absolute bottom-10 sm:bottom-20 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-white/5 rounded-full blur-2xl sm:blur-3xl"></div>
            <div className="absolute bottom-20 sm:bottom-40 right-1/3 w-40 h-40 sm:w-80 sm:h-80 bg-[#FCB240]/10 rounded-full blur-2xl sm:blur-3xl"></div>
          </div>

          {/* Grid Pattern Responsivo */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 sm:gap-4 h-full">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className="border border-white/20"></div>
              ))}
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Conteúdo Textual com Hierarquia Visual */}
              <div className="text-white space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left">
                <div className="space-y-4 sm:space-y-6">
                  {/* Badge de Status Responsivo */}
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/20 mx-auto lg:mx-0">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#20B04B] rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm font-bold text-white/90 tracking-wide">
                      SISTEMA ATIVO • RONDÔNIA
                    </span>
                  </div>

                  {/* Título Principal com Hierarquia */}
                  <div className="space-y-4 sm:space-y-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-none font-sans">
                      <span className="block text-white drop-shadow-2xl mb-2">
                        AGENDA
                      </span>
                      <span className="block text-white drop-shadow-2xl mb-2">
                        INTEGRADA
                      </span>
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FED22F] to-[#FCB240] drop-shadow-2xl">
                        SEDUC
                      </span>
                    </h1>

                    {/* Card de Informações Responsivo */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-6 border border-white/20 shadow-2xl mx-auto lg:mx-0 max-w-lg lg:max-w-none">
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-50 tracking-wide leading-tight">
                        SISTEMA DE AGENDAMENTOS
                      </p>
                      <p className="text-xs sm:text-sm lg:text-lg text-blue-200 mt-1 sm:mt-2 font-medium">
                        Secretaria da Educação • Estado de Rondônia
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Responsivo */}
                <div className="flex justify-center lg:justify-start pt-4 sm:pt-6">
                  <Link href="/login">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#FED22F] to-[#FCB240] hover:from-[#FCB240] hover:to-[#FED22F] text-[#315892] font-black px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-6 text-sm sm:text-base lg:text-xl rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-2 border-white/20"
                    >
                      <Calendar className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                      <span className="hidden sm:inline">COMEÇAR AGORA</span>
                      <span className="sm:hidden">COMEÇAR</span>
                      <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Interface Interativa Responsiva */}
              <div className="relative mt-8 lg:mt-0">
                <div className="relative max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
                  {/* Container Principal Responsivo */}
                  <Card className="w-full bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">
                    <CardContent className="p-0">
                      {/* Header da Interface */}
                      <div className="bg-gradient-to-r from-[#315892] to-[#005BA8] p-3 sm:p-4 text-white">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                              <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                            </div>
                            <div>
                              <h3 className="font-black text-sm sm:text-lg">
                                Dashboard
                              </h3>
                              <p className="text-blue-200 text-xs sm:text-sm font-medium">
                                Junho 2025
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-[#20B04B] text-white border-0 font-bold text-xs">
                            <TrendingUp className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                            Ativo
                          </Badge>
                        </div>

                        {/* Métricas Responsivas */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-4">
                          <div className="bg-white/10 rounded-lg sm:rounded-xl p-2 text-center">
                            <div className="text-lg sm:text-2xl font-black text-[#FED22F]">
                              12
                            </div>
                            <div className="text-xs font-semibold text-blue-200">
                              Este Mês
                            </div>
                          </div>
                          <div className="bg-white/10 rounded-lg sm:rounded-xl p-2 text-center">
                            <div className="text-lg sm:text-2xl font-black text-[#FED22F]">
                              3
                            </div>
                            <div className="text-xs font-semibold text-blue-200">
                              Hoje
                            </div>
                          </div>
                          <div className="bg-white/10 rounded-lg sm:rounded-xl p-2 text-center">
                            <div className="text-lg sm:text-2xl font-black text-[#FED22F]">
                              8
                            </div>
                            <div className="text-xs font-semibold text-blue-200">
                              Próximos
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Calendário Responsivo */}
                      <div className="p-2 sm:p-3">
                        <div
                          className={`transition-all duration-700 ${
                            animationStep >= 1
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-95"
                          }`}
                        >
                          {/* Cabeçalho do Calendário */}
                          <div className="grid grid-cols-7 gap-1 mb-3 sm:mb-4">
                            {["D", "S", "T", "Q", "Q", "S", "S"].map(
                              (day, i) => (
                                <div
                                  key={i}
                                  className="text-center text-xs font-black text-gray-400 p-1 sm:p-2"
                                >
                                  {day}
                                </div>
                              )
                            )}
                          </div>

                          {/* Grid do Calendário Responsivo */}
                          <div className="grid grid-cols-7 gap-1 mb-4 sm:mb-6">
                            {Array.from({ length: 35 }, (_, i) => {
                              const dayNumber = i - 1;
                              const isValidDay =
                                dayNumber > 0 && dayNumber <= 30;
                              const isClickableDay = dayNumber === 25;
                              const isToday = dayNumber === 23;
                              const hasEvent = [5, 12, 18].includes(dayNumber);

                              return (
                                <div
                                  key={i}
                                  className={`
                                    relative w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl transition-all duration-300 cursor-pointer
                                    ${isValidDay ? "hover:bg-gray-50" : ""}
                                    ${
                                      isToday
                                        ? "bg-gradient-to-br from-[#315892] to-[#005BA8] text-white shadow-lg"
                                        : ""
                                    }
                                    ${
                                      hasEvent && !isToday
                                        ? "bg-blue-50 text-[#315892]"
                                        : ""
                                    }
                                    ${
                                      isClickableDay && animationStep >= 2
                                        ? "bg-gradient-to-br from-[#FED22F] to-[#FCB240] text-[#315892] animate-pulse shadow-lg scale-110"
                                        : ""
                                    }
                                    ${
                                      isClickableDay && eventCreated
                                        ? "bg-gradient-to-br from-[#20B04B] to-[#16a34a] text-white"
                                        : ""
                                    }
                                  `}
                                >
                                  {isValidDay && dayNumber}

                                  {/* Indicadores de Eventos */}
                                  {hasEvent && !isToday && (
                                    <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#315892] rounded-full"></div>
                                  )}

                                  {isClickableDay && eventCreated && (
                                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-3 sm:h-3 bg-[#FED22F] rounded-full animate-bounce"></div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Lista de Eventos Responsiva */}
                          <div className="space-y-2 sm:space-y-3">
                            <h4 className="font-black text-gray-800 text-xs sm:text-sm uppercase tracking-wider font-mono">
                              Próximos Eventos
                            </h4>

                            <div className="space-y-1 sm:space-y-2">
                              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-50 rounded-lg sm:rounded-xl border-l-2 sm:border-l-4 border-[#315892]">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#315892] rounded-full"></div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-black text-[#315892] text-xs sm:text-sm font-sans truncate">
                                    Reunião Pedagógica
                                  </p>
                                  <p className="text-xs text-gray-600 font-bold font-mono">
                                    Hoje • 09:00
                                  </p>
                                </div>
                                <Badge
                                  variant="outline"
                                  className="text-xs font-black font-mono flex-shrink-0"
                                >
                                  Urgente
                                </Badge>
                              </div>

                              {eventCreated && (
                                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 rounded-lg sm:rounded-xl border-l-2 sm:border-l-4 border-[#20B04B] animate-slide-in-up">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#20B04B] rounded-full animate-pulse"></div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-black text-[#20B04B] text-xs sm:text-sm font-sans truncate">
                                      Reunião Pedagógica
                                    </p>
                                    <p className="text-xs text-gray-600 font-bold font-mono">
                                      25/06 • 14:00
                                    </p>
                                  </div>
                                  <Badge className="bg-[#20B04B] text-white text-xs font-black border-0 font-mono flex-shrink-0">
                                    Novo
                                  </Badge>
                                </div>
                              )}
                            </div>

                            {/* Estado Final da Animação */}
                            {animationStep === 8 && (
                              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-[#315892]/10 to-[#005BA8]/10 rounded-xl sm:rounded-2xl border-2 border-dashed border-[#315892]/30">
                                <div className="text-center space-y-2 sm:space-y-3">
                                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-[#315892] to-[#005BA8] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto">
                                    <Check className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                                  </div>
                                  <div>
                                    <h5 className="font-black text-[#315892] text-sm sm:text-lg font-sans tracking-tight">
                                      Sistema Pronto!
                                    </h5>
                                  </div>
                                  <div className="flex items-center justify-center gap-1 sm:gap-2 text-xs font-black text-[#20B04B] font-mono">
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#20B04B] rounded-full animate-pulse"></div>
                                    <span>SISTEMA ATIVO • RO</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Botão de Ação Flutuante Responsivo */}
                        <div
                          className={`absolute bottom-4 sm:bottom-6 right-4 sm:right-6 transition-all duration-500 ${
                            animationStep >= 2
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-0"
                          }`}
                        >
                          <Button
                            size="icon"
                            className={`w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-[#315892] to-[#005BA8] hover:from-[#005BA8] hover:to-[#315892] rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 ${
                              animationStep === 3 ? "animate-ping" : ""
                            }`}
                          >
                            <Plus className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Modal Responsivo */}
                  {showModal && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in rounded-2xl sm:rounded-3xl">
                      <Card className="w-full max-w-sm sm:max-w-md animate-scale-in shadow-2xl border-0">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#315892] to-[#005BA8] rounded-lg sm:rounded-xl flex items-center justify-center">
                                <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                              </div>
                              <div>
                                <h3 className="text-lg sm:text-xl font-black text-[#315892]">
                                  Novo Evento
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                                  Preencha os detalhes
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
                            >
                              <X className="h-4 w-4 sm:h-5 sm:w-5" />
                            </Button>
                          </div>

                          <div className="space-y-3 sm:space-y-4">
                            <div>
                              <label className="block text-xs sm:text-sm font-black text-gray-700 mb-1 sm:mb-2 uppercase tracking-wider">
                                Título
                              </label>
                              <input
                                type="text"
                                value={formData.title}
                                readOnly
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#315892] focus:border-transparent font-medium transition-all text-sm sm:text-base"
                                placeholder="Digite o título do evento..."
                              />
                            </div>

                            <div>
                              <label className="block text-xs sm:text-sm font-black text-gray-700 mb-1 sm:mb-2 uppercase tracking-wider">
                                Assunto
                              </label>
                              <input
                                type="text"
                                value={formData.subject}
                                readOnly
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#315892] focus:border-transparent font-medium transition-all text-sm sm:text-base"
                                placeholder="Descreva o assunto..."
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2 sm:gap-4">
                              <div>
                                <label className="block text-xs sm:text-sm font-black text-gray-700 mb-1 sm:mb-2 uppercase tracking-wider">
                                  Data
                                </label>
                                <input
                                  type="text"
                                  value={formData.date}
                                  readOnly
                                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#315892] focus:border-transparent font-medium transition-all text-sm sm:text-base"
                                />
                              </div>
                              <div>
                                <label className="block text-xs sm:text-sm font-black text-gray-700 mb-1 sm:mb-2 uppercase tracking-wider">
                                  Hora
                                </label>
                                <input
                                  type="text"
                                  value={formData.time}
                                  readOnly
                                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#315892] focus:border-transparent font-medium transition-all text-sm sm:text-base"
                                />
                              </div>
                            </div>

                            <div className="flex justify-end pt-2 sm:pt-4">
                              <Button
                                className={`bg-gradient-to-r from-[#315892] to-[#005BA8] hover:from-[#005BA8] hover:to-[#315892] text-white font-bold px-4 py-2 sm:px-8 sm:py-3 rounded-lg sm:rounded-xl shadow-lg transition-all text-sm sm:text-base ${
                                  animationStep >= 5 ? "animate-pulse" : ""
                                }`}
                              >
                                {animationStep >= 5 ? (
                                  <>
                                    <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                    Salvando...
                                  </>
                                ) : (
                                  <>
                                    <Check className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                    Criar Evento
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Notificação de Sucesso Responsiva */}
                  {animationStep >= 7 && (
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-gradient-to-r from-[#20B04B] to-[#16a34a] text-white px-3 py-2 sm:px-6 sm:py-4 rounded-lg sm:rounded-2xl shadow-2xl animate-bounce-in border-2 border-white/20">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                        </div>
                        <div>
                          <p className="font-black text-xs sm:text-sm">
                            Evento Criado!
                          </p>
                          <p className="text-xs text-green-100 font-medium">
                            Sucesso na operação
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Elementos Decorativos Responsivos */}
                  <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-4 h-4 sm:w-8 sm:h-8 bg-[#FED22F]/20 rounded-full blur-sm"></div>
                  <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-6 h-6 sm:w-12 sm:h-12 bg-[#315892]/20 rounded-full blur-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section com Responsividade Aprimorada */}
        <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          {/* Background Elements Responsivos */}
          <div className="absolute inset-0">
            <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 h-32 sm:w-64 sm:h-64 bg-[#315892]/5 rounded-full blur-2xl sm:blur-3xl"></div>
            <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-40 h-40 sm:w-80 sm:h-80 bg-[#FED22F]/5 rounded-full blur-2xl sm:blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header da Seção com Hierarquia Visual */}
            <div className="text-center mb-8 sm:mb-12 lg:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-[#315892] mb-4 sm:mb-6 lg:mb-8 tracking-tighter leading-none font-sans">
                Como funciona
              </h2>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
                Três passos simples para revolucionar sua gestão de tempo e
                maximizar sua produtividade
              </p>
            </div>

            {/* Cards Responsivos com Scroll Horizontal */}
            <div className="block lg:hidden">
              <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 px-2 snap-x snap-mandatory scrollbar-hide">
                {/* Feature 1 Mobile */}
                <Card className="min-w-[260px] sm:min-w-[300px] flex-shrink-0 snap-center hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="relative mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#315892] to-[#005BA8] rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                        <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-[#FED22F] rounded-full flex items-center justify-center">
                        <span className="text-xs font-black text-[#315892]">
                          1
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-[#315892] mb-3 sm:mb-4 tracking-tight font-sans">
                      Calendário Inteligente
                    </h3>

                    <p className="text-sm font-semibold text-gray-700 leading-relaxed mb-3 sm:mb-4">
                      Interface moderna e intuitiva que adapta-se ao seu fluxo
                      de trabalho, com visualização clara de todos os
                      compromissos
                    </p>

                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#315892]">
                      <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Rápido & Eficiente</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Feature 2 Mobile */}
                <Card className="min-w-[260px] sm:min-w-[300px] flex-shrink-0 snap-center hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="relative mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#20B04B] to-[#16a34a] rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                        <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-[#FED22F] rounded-full flex items-center justify-center">
                        <span className="text-xs font-black text-[#315892]">
                          2
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-[#315892] mb-3 sm:mb-4 tracking-tight font-sans">
                      Notificações Inteligentes
                    </h3>

                    <p className="text-sm font-semibold text-gray-700 leading-relaxed mb-3 sm:mb-4">
                      Sistema avançado de lembretes que garante que você nunca
                      perca uma reunião importante ou compromisso crítico
                    </p>

                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#20B04B]">
                      <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Sempre Conectado</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Feature 3 Mobile */}
                <Card className="min-w-[260px] sm:min-w-[300px] flex-shrink-0 snap-center hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="relative mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FCB240] to-[#FED22F] rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                        <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-[#315892] rounded-full flex items-center justify-center">
                        <span className="text-xs font-black text-white">3</span>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-[#315892] mb-3 sm:mb-4 tracking-tight font-sans">
                      Colaboração Avançada
                    </h3>

                    <p className="text-sm font-semibold text-gray-700 leading-relaxed mb-3 sm:mb-4">
                      Compartilhe agendas, coordene reuniões em equipe e
                      sincronize compromissos com colegas de forma seamless
                    </p>

                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#FCB240]">
                      <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Trabalho em Equipe</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Indicadores de Scroll */}
              <div className="flex justify-center mt-4 gap-2">
                <div className="w-2 h-2 bg-[#315892] rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            {/* Grid Desktop */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Feature 1 Desktop */}
              <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#315892] to-[#005BA8] rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                      <Calendar className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#FED22F] rounded-full flex items-center justify-center">
                      <span className="text-xs font-black text-[#315892]">
                        1
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-[#315892] mb-6 tracking-tight font-sans">
                    Calendário Inteligente
                  </h3>

                  <p className="text-lg font-semibold text-gray-700 leading-relaxed mb-6">
                    Interface moderna e intuitiva que adapta-se ao seu fluxo de
                    trabalho, com visualização clara de todos os compromissos
                  </p>

                  <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#315892]">
                    <Zap className="h-4 w-4" />
                    <span>Rápido & Eficiente</span>
                  </div>
                </CardContent>
              </Card>

              {/* Feature 2 Desktop */}
              <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#20B04B] to-[#16a34a] rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                      <Bell className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#FED22F] rounded-full flex items-center justify-center">
                      <span className="text-xs font-black text-[#315892]">
                        2
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-[#315892] mb-6 tracking-tight font-sans">
                    Notificações Inteligentes
                  </h3>

                  <p className="text-lg font-semibold text-gray-700 leading-relaxed mb-6">
                    Sistema avançado de lembretes que garante que você nunca
                    perca uma reunião importante ou compromisso crítico
                  </p>

                  <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#20B04B]">
                    <Bell className="h-4 w-4" />
                    <span>Sempre Conectado</span>
                  </div>
                </CardContent>
              </Card>

              {/* Feature 3 Desktop */}
              <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#FCB240] to-[#FED22F] rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#315892] rounded-full flex items-center justify-center">
                      <span className="text-xs font-black text-white">3</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-[#315892] mb-6 tracking-tight font-sans">
                    Colaboração Avançada
                  </h3>

                  <p className="text-lg font-semibold text-gray-700 leading-relaxed mb-6">
                    Compartilhe agendas, coordene reuniões em equipe e
                    sincronize compromissos com colegas de forma seamless
                  </p>

                  <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#FCB240]">
                    <Users className="h-4 w-4" />
                    <span>Trabalho em Equipe</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Responsivo */}
      <footer className="bg-gradient-to-r from-[#005BA8] to-[#315892] py-8 sm:py-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-white/5 rounded-full blur-xl sm:blur-2xl"></div>
          <div className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-20 h-20 sm:w-40 sm:h-40 bg-[#FED22F]/10 rounded-full blur-xl sm:blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/20">
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="text-white">
                <h3 className="text-lg sm:text-2xl font-black tracking-tight font-sans">
                  AGENDA SEDUC
                </h3>
                <p className="text-blue-200 text-sm sm:text-base font-bold font-mono">
                  Sistema Oficial de Agendamentos
                </p>
                <p className="text-blue-300 text-xs sm:text-sm font-medium">
                  Secretaria da Educação • Rondônia
                </p>
              </div>
            </div>

            <div className="text-center sm:text-right">
              <p className="text-blue-200 text-sm sm:text-base font-semibold mb-1 sm:mb-2">
                © {new Date().getFullYear()} Governo do Estado de Rondônia
              </p>
              <p className="text-blue-300 text-xs sm:text-sm font-medium">
                Desenvolvido com ❤️ para a educação
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
