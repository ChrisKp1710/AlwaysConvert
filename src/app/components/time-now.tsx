'use client';

import { useEffect, useState } from "react";

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
    <div className="text-center space-y-1">
      <p className="text-sm font-medium text-muted-foreground">{dateString}</p>
      <p className="text-xl font-semibold text-foreground tracking-wider">{timeString}</p>
    </div>
  );
};

export default TimeNow;
