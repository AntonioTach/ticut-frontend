import * as React from "react"
import { cn } from "@/lib/utils"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

export interface CalendarProps {
  className?: string
  date: Date | undefined | null
  setDate: (date: Date | undefined) => void
  ariaLabel?: string
}

export function Calendar({ className, date, setDate, ariaLabel }: CalendarProps) {
  return (
    <DayPicker
      mode="single"
      selected={date ?? undefined}
      onSelect={setDate}
      className={cn("rounded-md border bg-white p-3 shadow", className)}
      aria-label={ariaLabel}
      fromDate={new Date()}
      modifiersClassNames={{
        selected: "bg-blue-600 text-white",
        today: "border-blue-600 border-2"
      }}
    />
  )
} 