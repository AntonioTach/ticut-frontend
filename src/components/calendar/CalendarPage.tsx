'use client';
import React, { useState } from 'react';
import { barbers, appointments as mockAppointments } from './mocks';
import { Barber, Appointment } from './types';
import FullScreenCalendar from './FullScreenCalendar';

/**
 * Componente principal de la página de calendario
 * Simula autenticación y permite cambiar de usuario para demo
 */
const CalendarPage: React.FC = () => {
  // Simular usuario autenticado (puedes cambiar el índice para probar)
  const [currentUser, setCurrentUser] = useState<Barber>(barbers[0]);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  return (
    <div className="flex flex-col items-center min-h-screen p-4 md:p-8 gap-8 bg-neutral-50">
      <div className="w-full bg-white rounded-xl flex flex-col md:flex-row items-center">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-base">
            {currentUser.name.charAt(0)}
          </span>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800 text-sm">{currentUser.name}</span>
            <span className="text-xs text-gray-500 capitalize">{currentUser.role}</span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end">
          <label htmlFor="user-select" className="mr-1 text-xs text-gray-600">Switch user:</label>
          <select
            id="user-select"
            value={currentUser.id}
            onChange={e => setCurrentUser(barbers.find(u => u.id === e.target.value) || barbers[0])}
            className="border border-gray-300 rounded px-1 py-0.5 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-xs"
            aria-label="Select user"
            style={{ minWidth: 120 }}
          >
            {barbers.map(u => (
              <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
            ))}
          </select>
        </div>
      </div>
    
      <div className="w-full">
        <FullScreenCalendar
          appointments={currentUser.role === 'owner' ? appointments : appointments.filter(a => a.barberId === currentUser.id)}
          barbers={currentUser.role === 'owner' ? barbers.filter(u => u.role === 'barber') : [currentUser]}
          currentUser={currentUser}
          onChange={setAppointments}
          dayViewHours={{ start: '08:00', end: '20:00' }}
        />
      </div>
    </div>
  );
};

export default CalendarPage; 