import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/core';
import { Appointment, User } from './types';
import AppointmentModal from './AppointmentModal';

interface DayViewHours {
  start: string; // formato '08:00'
  end: string;   // formato '20:00'
}

interface FullScreenCalendarProps {
  appointments: Appointment[];
  barbers: User[];
  currentUser: User;
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
    setSelectedStart(null);
    setSelectedEnd(null);
    setSelectedEvent(null);
    setModalOpen(true);
  };

  // Handler para select (doble click o arrastrar)
  const handleSelect = (arg: { start: Date; end: Date }) => {
    // Usar la fecha de inicio seleccionada
    handleCreateAt(arg.start);
  };

  return (
    <div className="w-[95vw] max-w-7xl h-[90vh] mx-auto my-8 bg-white rounded-2xl shadow-2xl p-4 flex flex-col">
      <div className="mb-4 flex items-center justify-end">
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium shadow"
          onClick={handleOpenNewAppointment}
          aria-label="Nuevo Appointment"
        >
          Nuevo Appointment
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
          events={appointments.map(a => ({
            id: a.id,
            title: `${a.title} (${barbers.find(b => b.id === a.barberId)?.name || ''})`,
            start: a.start,
            end: a.end,
            className: `fc-event-barber-${barbers.findIndex(b => b.id === a.barberId) + 1 || 'other'}`,
          }))}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          selectable={true}
          select={handleSelect}
          height="100%"
          slotMinTime={dayViewHours.start}
          slotMaxTime={dayViewHours.end}
          expandRows
          eventOverlap={true}
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