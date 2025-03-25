'use client';

import { useEffect, useState } from "react";
import { CalendarDays, Clock } from "lucide-react"; // ✅ Icone minimali

const TimeNow: React.FC = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const dateString = dateTime.toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timeString = dateTime.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="text-center space-y-3">
      {/* 🗓️ Data */}
      <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
        <CalendarDays className="w-4 h-4" />
        <span>{dateString}</span>
      </div>

      {/* ⏰ Ora */}
      <div className="flex items-center justify-center gap-2 text-2xl font-bold text-foreground tracking-wide">
        <Clock className="w-5 h-5" />
        <span>{timeString}</span>
      </div>
    </div>
  );
};

export default TimeNow;
