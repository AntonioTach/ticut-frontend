'use client';
import React, { useState, useEffect } from 'react';
import { Appointment, User } from './types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (appointment: Appointment) => void;
  initialData?: Appointment | null;
  barbers: User[];
  currentUser: User;
}

/**
 * Modal para crear o editar una cita (estilo original, simple)
 */
const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  barbers,
  currentUser,
}) => {
  const [form, setForm] = useState<Appointment>(
    initialData || {
      id: '',
      title: '',
      start: '',
      end: '',
      barberId: currentUser.role === 'barber' ? currentUser.id : '',
      clientName: '',
      notes: '',
    }
  );

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm({
      id: '',
      title: '',
      start: '',
      end: '',
      barberId: currentUser.role === 'barber' ? currentUser.id : '',
      clientName: '',
      notes: '',
    });
  }, [initialData, currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.start || !form.end || !form.barberId || !form.clientName) return;
    onSave({ ...form, id: form.id || Math.random().toString(36).substr(2, 9) });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Appointment Modal">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{form.id ? 'Edit Appointment' : 'New Appointment'}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="border rounded px-3 py-2"
            required
            aria-label="Title"
          />
          <input
            name="clientName"
            value={form.clientName}
            onChange={handleChange}
            placeholder="Client Name"
            className="border rounded px-3 py-2"
            required
            aria-label="Client Name"
          />
          <input
            name="start"
            type="datetime-local"
            value={form.start}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
            aria-label="Start Date and Time"
          />
          <input
            name="end"
            type="datetime-local"
            value={form.end}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
            aria-label="End Date and Time"
          />
          {currentUser.role === 'owner' && (
            <select
              name="barberId"
              value={form.barberId}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
              aria-label="Barber"
            >
              <option value="">Select Barber</option>
              {barbers.map((barber) => (
                <option key={barber.id} value={barber.id}>{barber.name}</option>
              ))}
            </select>
          )}
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes (optional)"
            className="border rounded px-3 py-2"
            aria-label="Notes"
          />
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" aria-label="Cancel">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700" aria-label="Save Appointment">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal; 