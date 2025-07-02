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
import esLocale from '@fullcalendar/core/locales/es';

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

  const handleDelete = (appointment: Appointment) => {
    onChange(appointments.filter(a => a.id !== appointment.id));
    setModalOpen(false);
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
      <div className="mb-4 flex items-center justify-between w-full">
        <div className="flex-1 flex justify-center">
          <h1 className="text-2xl ml-16 font-bold text-gray-800 tracking-tight">Hunters</h1>
        </div>
        <button
          className="px-4 py-2 rounded bg-[#60a5fa] text-white hover:bg-[#3b82f6] transition-colors text-sm font-medium shadow ml-4"
          onClick={handleOpenNewAppointment}
          aria-label="Nueva cita"
        >
          Nueva cita
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
              borderColor: barber?.color || '#60a5fa',
              backgroundColor: '#fff',
              textColor: '#0f172a',
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
            const color = info.event.extendedProps.color || '#60a5fa';
            info.el.style.borderColor = color;
            info.el.style.background = '#fff';
            info.el.style.color = '#0f172a';
            info.el.addEventListener('mouseenter', () => {
              info.el.style.background = color;
              info.el.style.color = '#fff';
            });
            info.el.addEventListener('mouseleave', () => {
              info.el.style.background = '#fff';
              info.el.style.color = '#0f172a';
            });
            // Tooltip accesible
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
          locales={[esLocale]}
          locale="es"
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
        onDelete={handleDelete}
      />
    </div>
  );
};

export default FullScreenCalendar; 