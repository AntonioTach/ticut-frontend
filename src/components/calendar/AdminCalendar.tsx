import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/core';
import { Appointment, User } from './types';
import AppointmentModal from './AppointmentModal';

interface AdminCalendarProps {
  appointments: Appointment[];
  barbers: User[];
  currentUser: User;
  onChange: (appointments: Appointment[]) => void;
}

/**
 * Calendario para el owner/admin: puede ver y editar todas las citas
 */
const AdminCalendar: React.FC<AdminCalendarProps> = ({ appointments, barbers, currentUser, onChange }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Appointment | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

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
    <div className="w-full max-w-5xl mx-auto">
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
        height="auto"
      />
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

export default AdminCalendar; 