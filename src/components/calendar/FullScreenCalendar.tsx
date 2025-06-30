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
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.dateStr);
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

  return (
    <div className="w-[95vw] max-w-7xl h-[90vh] mx-auto my-8 bg-white rounded-2xl shadow-2xl p-4 flex flex-col">
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
          height="100%"
          slotMinTime={dayViewHours.start}
          slotMaxTime={dayViewHours.end}
          expandRows
        />
      </div>
      <AppointmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={selectedEvent || (selectedDate ? {
          id: '',
          title: '',
          start: selectedDate + 'T09:00',
          end: selectedDate + 'T09:30',
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