import React, { useState, useEffect, useRef } from "react";
import "./StudyRoom.css";

const themes = {
  dark: { bg: "linear-gradient(135deg,#0f172a,#1e293b)", card: "rgba(30,41,59,0.6)", text: "#f1f5f9" },
  blue: { bg: "linear-gradient(135deg,#1e3a8a,#3b82f6)", card: "rgba(59,130,246,0.6)", text: "#e0f2fe" },
  purple: { bg: "linear-gradient(135deg,#4c1d95,#a78bfa)", card: "rgba(167,139,250,0.6)", text: "#ede9fe" },
  green: { bg: "linear-gradient(135deg,#064e3b,#10b981)", card: "rgba(16,185,129,0.6)", text: "#d1fae5" },
  sunset: { bg: "linear-gradient(135deg,#7c2d12,#f97316)", card: "rgba(249,115,22,0.6)", text: "#fff7ed" },
};

const StudyRoom = () => {
  const [theme, setTheme] = useState("dark");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [usePomodoro, setUsePomodoro] = useState(false);
  const timerRef = useRef(null);
  const canvasRef = useRef(null);

  const pomodoroTime = 25 * 60;

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => {
          if (usePomodoro && prev + 1 >= pomodoroTime) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return pomodoroTime;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, usePomodoro]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => setTime(0);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Convert hex color to RGB array
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  // Canvas effect: blobs + static background elements
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#f87171", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa"];
    const blobs = [];

    // Static background elements
    const staticElements = [];
for (let i = 0; i < 50; i++) {
  staticElements.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 6 + 3,      // slightly bigger
    alpha: Math.random() * 0.3 + 0.1,   // more visible
    color: colors[Math.floor(Math.random() * colors.length)],
  });
}

    const createBlob = (x, y) => {
      blobs.push({
        x,
        y,
        radius: Math.random() * 80 + 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.6,
        growth: Math.random() * 0.5 + 0.2,
        fade: 0.005 + Math.random() * 0.01,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw static elements
      staticElements.forEach((s) => {
        const [r, g, b] = hexToRgb(s.color);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${s.alpha})`;
        ctx.fill();
      });

      // Draw blobs
      for (let i = blobs.length - 1; i >= 0; i--) {
        const b = blobs[i];
        b.radius += b.growth;
        b.alpha -= b.fade;

        const [r, g, bl] = hexToRgb(b.color);
        const gradient = ctx.createRadialGradient(
          b.x,
          b.y,
          b.radius * 0.2,
          b.x,
          b.y,
          b.radius
        );
        gradient.addColorStop(0, `rgba(${r},${g},${bl},${b.alpha})`);
        gradient.addColorStop(1, `rgba(${r},${g},${bl},0)`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        if (b.alpha <= 0) blobs.splice(i, 1);
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleClick = (e) => createBlob(e.clientX, e.clientY);
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      className="studyroom-wrapper"
      style={{ background: themes[theme].bg, color: themes[theme].text }}
    >
      <canvas ref={canvasRef} className="bg-canvas" />

      {/* Theme Switch */}
      <div className="theme-switcher">
        {Object.keys(themes).map((t) => (
          <button
            key={t}
            className={`theme-btn ${theme === t ? "active" : ""}`}
            style={{ background: themes[t].card, color: themes[t].text }}
            onClick={() => setTheme(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Pomodoro toggle */}
      <div className="pomodoro-toggle">
        <span className="toggle-label">Use Pomodoro (25 min)</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={usePomodoro}
            onChange={() => {
              setUsePomodoro(!usePomodoro);
              resetTimer();
            }}
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* Timer Display */}
      <div className="timer-display">
        {formatTime(usePomodoro ? Math.min(time, pomodoroTime) : time)}
      </div>

      {/* Controls */}
      <div className="timer-buttons">
        <button className="btn start" onClick={startTimer}>
          ▶ Start
        </button>
        <button className="btn pause" onClick={pauseTimer}>
          ⏸ Pause
        </button>
        <button className="btn reset" onClick={resetTimer}>
          ⟳ Reset
        </button>
      </div>
    </div>
  );
};

export default StudyRoom;
