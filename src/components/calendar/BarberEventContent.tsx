import React from 'react';

interface BarberEventContentProps {
  color: string;
  start: string;
  end: string;
  clientName: string;
}

const formatHour = (iso: string): string => {
  const date = new Date(iso);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
};

export const BarberEventContent: React.FC<BarberEventContentProps> = ({ color, start, end, clientName }) => (
  <div className="flex items-center gap-2">
    <span className="inline-block w-2 h-2 rounded-full" style={{ background: color }} aria-label="Barber color" />
    <span className="font-semibold text-xs">{formatHour(start)}–{formatHour(end)}</span>
    <span className="truncate text-xs font-bold" style={{ minWidth: 0 }}>{clientName}</span>
  </div>
); 