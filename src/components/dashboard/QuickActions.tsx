'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, CalendarPlus, Sparkles, Zap } from "lucide-react";
import { useState } from "react";
import { ClientRegistrationModal } from "./ClientRegistrationModal";
import { AppointmentBookingModal } from "./AppointmentBookingModal";
import { useToast } from "@/components/ui/toast";

export function QuickActions() {
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const { ToastContainer } = useToast();

  return (
    <>
      <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900/50 dark:via-blue-900/30 dark:to-indigo-900/30">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-2xl"></div>
        
        <CardHeader className="pb-4 relative z-10">
          <CardTitle className="text-lg font-bold flex items-center gap-3 text-gray-800 dark:text-gray-100">
            <div className="relative">
              <div className="p-2.5 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-xl shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                Acciones Rápidas
                <Zap className="h-4 w-4 text-yellow-500 animate-pulse" />
              </div>
              <div className="text-xs font-normal text-gray-500 dark:text-gray-400 mt-1">
                Acceso directo a funciones principales
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0 relative z-10">
          <div className="space-y-4">
            <Button
              onClick={() => setIsClientModalOpen(true)}
              className="group/btn w-full h-16 flex items-center justify-between px-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0 relative overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-base">Registrar Cliente</div>
                  <div className="text-xs opacity-90">Nuevo cliente</div>
                </div>
              </div>
              <div className="opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              </div>
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
            </Button>
            
            <Button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="group/btn w-full h-16 flex items-center justify-between px-6 bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0 relative overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
                  <CalendarPlus className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-base">Nueva Cita</div>
                  <div className="text-xs opacity-90">Agendar servicio</div>
                </div>
              </div>
              <div className="opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              </div>
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
            </Button>
          </div>
        </CardContent>
      </Card>

      <ClientRegistrationModal 
        isOpen={isClientModalOpen} 
        onClose={() => setIsClientModalOpen(false)} 
      />
      
      <AppointmentBookingModal 
        isOpen={isAppointmentModalOpen} 
        onClose={() => setIsAppointmentModalOpen(false)} 
      />

      <ToastContainer />
    </>
  );
} 