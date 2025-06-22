'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Calendar, Clock, User, Scissors, Save, Loader2, Search } from "lucide-react";
import { ClientSearch } from "./ClientSearch";
import { useToast } from "@/components/ui/toast";

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AppointmentFormData {
  clientName: string;
  clientPhone: string;
  service: string;
  barber: string;
  date: string;
  time: string;
  notes: string;
}

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
}

const availableServices = [
  { id: 1, name: "Corte de cabello", price: 25, duration: 30 },
  { id: 2, name: "Barba", price: 15, duration: 20 },
  { id: 3, name: "Corte + Barba", price: 35, duration: 45 },
  { id: 4, name: "Tinte", price: 45, duration: 60 },
  { id: 5, name: "Corte clásico", price: 20, duration: 25 },
  { id: 6, name: "Tratamiento capilar", price: 30, duration: 40 }
];

const availableBarbers = [
  { id: 1, name: "Carlos", specialty: "Cortes modernos" },
  { id: 2, name: "Luis", specialty: "Barbas" },
  { id: 3, name: "Miguel", specialty: "Cortes clásicos" },
  { id: 4, name: "Sofia", specialty: "Tintes y tratamientos" }
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00"
];

export function AppointmentBookingModal({ isOpen, onClose }: AppointmentBookingModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showClientSearch, setShowClientSearch] = useState(false);
  const { addToast } = useToast();
  const [formData, setFormData] = useState<AppointmentFormData>({
    clientName: '',
    clientPhone: '',
    service: '',
    barber: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleInputChange = (field: keyof AppointmentFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClientSelect = (client: Client) => {
    setFormData(prev => ({
      ...prev,
      clientName: client.name,
      clientPhone: client.phone
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simular envío de datos
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aquí iría la lógica real para guardar la cita
      console.log('Cita registrada:', formData);
      
      // Mostrar notificación de éxito
      addToast(`Cita creada exitosamente para ${formData.clientName}`, 'success');
      
      setIsLoading(false);
      onClose();
      
      // Limpiar formulario
      setFormData({
        clientName: '',
        clientPhone: '',
        service: '',
        barber: '',
        date: '',
        time: '',
        notes: ''
      });
    } catch {
      setIsLoading(false);
      addToast('Error al crear la cita. Inténtalo de nuevo.', 'error');
    }
  };

  // Obtener fecha mínima (hoy)
  const today = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border-0 bg-white/95 backdrop-blur-md dark:bg-gray-900/95">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Nueva Cita
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Información del Cliente */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <User className="h-4 w-4" />
                    Información del Cliente
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowClientSearch(true)}
                    className="text-xs"
                  >
                    <Search className="h-3 w-3 mr-1" />
                    Buscar Cliente
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => handleInputChange('clientName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Juan Pérez"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={formData.clientPhone}
                      onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="+34 600 123 456"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Servicio y Barbero */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Scissors className="h-4 w-4" />
                  Servicio y Barbero
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Servicio
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => handleInputChange('service', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Seleccionar servicio</option>
                      {availableServices.map(service => (
                        <option key={service.id} value={service.name}>
                          {service.name} - ${service.price}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Barbero
                    </label>
                    <select
                      value={formData.barber}
                      onChange={(e) => handleInputChange('barber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Seleccionar barbero</option>
                      {availableBarbers.map(barber => (
                        <option key={barber.id} value={barber.name}>
                          {barber.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Fecha y Hora */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Fecha y Hora
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      min={today}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hora
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Seleccionar hora</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Notas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notas
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Preferencias especiales, alergias, etc."
                  rows={3}
                />
              </div>

              {/* Botones */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Crear Cita
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {showClientSearch && (
        <ClientSearch
          onClientSelect={handleClientSelect}
          onClose={() => setShowClientSearch(false)}
        />
      )}
    </>
  );
} 