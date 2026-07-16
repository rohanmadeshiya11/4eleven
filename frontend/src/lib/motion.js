// Shared framer-motion variants and constants for 4-11 Studio
export const EASE = [0.76, 0, 0.24, 1];

export const revealUp = {
  hidden: { y: "110%" },
  visible: (i = 0) => ({
    y: "0%",
    transition: { duration: 1.1, ease: EASE, delay: 0.15 * i },
  }),
};

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: 0.08 * i },
  }),
};

// Countdown target: persisted ~110 days from first visit so it counts down consistently
export const getLaunchDate = () => {
  try {
    const stored = localStorage.getItem("411-launch");
    if (stored) return new Date(stored);
    const target = new Date(Date.now() + 110 * 24 * 60 * 60 * 1000);
    localStorage.setItem("411-launch", target.toISOString());
    return target;
  } catch {
    return new Date(Date.now() + 110 * 24 * 60 * 60 * 1000);
  }
};
