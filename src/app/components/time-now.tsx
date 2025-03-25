'use client';

import { useEffect, useState } from "react";

const TimeNow: React.FC = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const dateString = dateTime.toLocaleDateString("it-IT", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timeString = dateTime.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="text-xs text-center text-muted-foreground mt-2 space-y-1">
      <p>{dateString}</p>
      <p>{timeString}</p>
    </div>
  );
};

export default TimeNow;
