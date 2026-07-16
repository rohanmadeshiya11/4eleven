import { useEffect, useState, useRef } from "react";
import { getLaunchDate } from "@/lib/motion";

const pad = (n) => String(n).padStart(2, "0");

const getRemaining = (target) => {
  const diff = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  return { days, hours, mins, secs };
};

const Countdown = () => {
  const targetRef = useRef(getLaunchDate());
  const [t, setT] = useState(getRemaining(targetRef.current));

  useEffect(() => {
    const id = setInterval(() => setT(getRemaining(targetRef.current)), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: pad(t.days) },
    { label: "Hrs", value: pad(t.hours) },
    { label: "Mins", value: pad(t.mins) },
    { label: "Secs", value: pad(t.secs) },
  ];

  return (
    <div
      className="flex items-end gap-6 sm:gap-10 font-mono"
      data-testid="countdown-timer"
    >
      {units.map((u, i) => (
        <div key={u.label} className="flex items-end gap-6 sm:gap-10">
          <div className="flex flex-col">
            <span
              className="text-4xl sm:text-6xl font-medium tabular-nums leading-none"
              data-testid={`countdown-${u.label.toLowerCase()}`}
            >
              {u.value}
            </span>
            <span className="mt-2 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
              {u.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="text-3xl sm:text-5xl text-accent leading-none pb-4">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Countdown;
