import { User, Appointment } from './types';

export const users: User[] = [
  { id: '1', name: 'Owner Admin', role: 'owner' },
  { id: '2', name: 'Barber John', role: 'barber' },
  { id: '3', name: 'Barber Jane', role: 'barber' },
];

export const appointments: Appointment[] = [
  {
    id: 'a1',
    title: 'Haircut - Mike',
    start: '2024-06-10T10:00:00',
    end: '2024-06-10T10:30:00',
    barberId: '2',
    clientName: 'Mike',
    notes: 'Short fade',
  },
  {
    id: 'a2',
    title: 'Beard Trim - Alex',
    start: '2024-06-10T11:00:00',
    end: '2024-06-10T11:20:00',
    barberId: '3',
    clientName: 'Alex',
    notes: '',
  },
  {
    id: 'a3',
    title: 'Haircut - Sam',
    start: '2024-06-11T09:00:00',
    end: '2024-06-11T09:30:00',
    barberId: '2',
    clientName: 'Sam',
    notes: 'Layered',
  },
]; 