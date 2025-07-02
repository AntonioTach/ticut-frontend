import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/core';
import { Appointment, Barber } from './types';
import AppointmentModal from './AppointmentModal';
import { BarberEventContent } from './BarberEventContent';
import { EventContentArg } from '@fullcalendar/core';

interface DayViewHours {
  start: string; // formato '08:00'
  end: string;   // formato '20:00'
}

interface FullScreenCalendarProps {
  appointments: Appointment[];
  barbers: Barber[];
  currentUser: Barber;
  onChange: (appointments: Appointment[]) => void;
  dayViewHours?: DayViewHours;
}

/**
 * Calendario de pantalla completa con vistas mensual, semanal y diaria.
 * La vista diaria es configurable por prop.
 */
const FullScreenCalendar: React.FC<FullScreenCalendarProps> = ({
  appointments,
  barbers,
  currentUser,
  onChange,
  dayViewHours = { start: '08:00', end: '20:00' },
}) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<Appointment | null>(null);
  const [selectedStart, setSelectedStart] = React.useState<string | null>(null);
  const [selectedEnd, setSelectedEnd] = React.useState<string | null>(null);

  const handleDateClick = (arg: DateClickArg) => {
    const startDate = arg.date;
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // +1 hora
    const toLocalInputString = (date: Date) => {
      const pad = (n: number) => n.toString().padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };
    setSelectedStart(toLocalInputString(startDate));
    setSelectedEnd(toLocalInputString(endDate));
    setSelectedEvent(null);
    setModalOpen(true);
  };

  const handleEventClick = (arg: EventClickArg) => {
    const appt = appointments.find(a => a.id === arg.event.id);
    if (appt) {
      setSelectedEvent(appt);
      setModalOpen(true);
    }
  };

  const handleSave = (appointment: Appointment) => {
    const exists = appointments.some(a => a.id === appointment.id);
    if (exists) {
      onChange(appointments.map(a => (a.id === appointment.id ? appointment : a)));
    } else {
      onChange([...appointments, appointment]);
    }
  };

  // Función para abrir el modal en modo nuevo appointment en una fecha/hora específica
  const handleCreateAt = (date: Date) => {
    const endDate = new Date(date.getTime() + 60 * 60 * 1000); // +1 hora
    const toLocalInputString = (date: Date) => {
      const pad = (n: number) => n.toString().padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };
    setSelectedStart(toLocalInputString(date));
    setSelectedEnd(toLocalInputString(endDate));
    setSelectedEvent(null);
    setModalOpen(true);
  };

  // Handler para abrir modal vacío (nuevo appointment)
  const handleOpenNewAppointment = () => {
    const now = new Date();
    const end = new Date(now.getTime() + 60 * 60 * 1000);
    const toLocalInputString = (date: Date) => {
      const pad = (n: number) => n.toString().padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };
    setSelectedStart(toLocalInputString(now));
    setSelectedEnd(toLocalInputString(end));
    setSelectedEvent(null);
    setModalOpen(true);
  };

  // Handler para select (doble click o arrastrar)
  const handleSelect = (arg: { start: Date; end: Date }) => {
    // Usar la fecha de inicio seleccionada
    handleCreateAt(arg.start);
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    const color = eventInfo.event.extendedProps.color as string || '#3b82f6';
    const start = eventInfo.event.startStr;
    const end = eventInfo.event.endStr;
    const clientName = eventInfo.event.extendedProps.clientName as string || '';
    return (
      <BarberEventContent color={color} start={start} end={end} clientName={clientName} />
    );
  };

  return (
    <div className="w-[95vw] max-w-7xl h-[90vh] mx-auto my-8 bg-white rounded-2xl shadow-2xl p-4 flex flex-col">
      <div className="mb-4 flex items-center justify-end">
        <button
          className="py-2 rounded group/btn h-10 flex items-center justify-between px-6 bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0 relative overflow-hidden"
          onClick={handleOpenNewAppointment}
          aria-label="Nueva Cita"
        >
          Nueva Cita
        </button>
      </div>
      <div className="flex-1 flex flex-col">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={appointments.map(a => {
            const barber = barbers.find(b => b.id === a.barberId);
            return {
              id: a.id,
              title: a.title,
              start: a.start,
              end: a.end,
              color: barber?.color || '#3b82f6',
              extendedProps: {
                barberName: barber?.name,
                clientName: a.clientName,
                notes: a.notes,
                color: barber?.color,
              }
            };
          })}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          selectable={true}
          select={handleSelect}
          height="100%"
          slotMinTime={dayViewHours.start}
          slotMaxTime={dayViewHours.end}
          expandRows
          eventOverlap={true}
          dayMaxEventRows={3}
          eventContent={renderEventContent}
          eventDidMount={info => {
            info.el.setAttribute('title',
              `Barbero: ${info.event.extendedProps.barberName}\nCliente: ${info.event.extendedProps.clientName}\nNotas: ${info.event.extendedProps.notes || ''}`
            );
            info.el.setAttribute('tabindex', '0');
            info.el.setAttribute('aria-label', `Cita con ${info.event.extendedProps.clientName} atendida por ${info.event.extendedProps.barberName}`);
          }}
          moreLinkContent={arg => (
            <span
              className="flex items-center gap-1 text-sm font-bold text-blue-700 underline cursor-pointer"
              title="Ver todas las citas de este día"
              aria-label="Ver todas las citas de este día"
            >
              +{arg.num} más
            </span>
          )}
        />
      </div>
      <AppointmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={selectedEvent || (selectedStart && selectedEnd ? {
          id: '',
          title: '',
          start: selectedStart,
          end: selectedEnd,
          barberId: '',
          clientName: '',
          notes: '',
        } : null)}
        barbers={barbers}
        currentUser={currentUser}
      />
    </div>
  );
};

export default FullScreenCalendar; 