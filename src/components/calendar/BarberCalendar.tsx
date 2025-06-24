import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/core';
import { Appointment, User } from './types';
import AppointmentModal from './AppointmentModal';

interface BarberCalendarProps {
  appointments: Appointment[];
  currentUser: User;
  onChange: (appointments: Appointment[]) => void;
}

/**
 * Calendario para el barbero: puede ver y editar solo sus propias citas
 */
const BarberCalendar: React.FC<BarberCalendarProps> = ({ appointments, currentUser, onChange }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Appointment | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const myAppointments = appointments.filter(a => a.barberId === currentUser.id);

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.dateStr);
    setSelectedEvent(null);
    setModalOpen(true);
  };

  const handleEventClick = (arg: EventClickArg) => {
    const appt = myAppointments.find(a => a.id === arg.event.id);
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
        events={myAppointments.map(a => ({
          id: a.id,
          title: a.title,
          start: a.start,
          end: a.end,
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
          barberId: currentUser.id,
          clientName: '',
          notes: '',
        } : null)}
        barbers={[currentUser]}
        currentUser={currentUser}
      />
    </div>
  );
};

export default BarberCalendar; 