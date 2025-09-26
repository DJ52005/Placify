import React, { useState, useEffect, useRef } from "react";
import "./StudyRoom.css"; // For styles & canvas effect

const themes = {
  dark: { bg: "#0f172a", card: "#1e293b", text: "#f1f5f9" },
  blue: { bg: "#1e3a8a", card: "#3b82f6", text: "#e0f2fe" },
  purple: { bg: "#4c1d95", card: "#a78bfa", text: "#ede9fe" },
  green: { bg: "#064e3b", card: "#10b981", text: "#d1fae5" },
  sunset: { bg: "#7c2d12", card: "#f97316", text: "#fff7ed" },
};

const StudyRoom = () => {
  const [theme, setTheme] = useState("dark");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [usePomodoro, setUsePomodoro] = useState(false);
  const timerRef = useRef(null);
  const canvasRef = useRef(null);

  const pomodoroTime = 25 * 60;

  // ---- Timer Logic ----
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

  // ---- Color Flow Effect ----
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#f87171", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa"];
    const particles = [];

    const createParticles = (x, y) => {
      for (let i = 0; i < 30; i++) {
        particles.push({
          x,
          y,
          radius: Math.random() * 6 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          velocityX: (Math.random() - 0.5) * 6,
          velocityY: (Math.random() - 0.5) * 6,
          life: 100,
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.velocityX;
        p.y += p.velocityY;
        p.life--;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (p.life <= 0) particles.splice(i, 1);
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleClick = (e) => {
      createParticles(e.clientX, e.clientY);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      className="studyroom-wrapper"
      style={{
        backgroundColor: themes[theme].bg,
        color: themes[theme].text,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        transition: "all 0.5s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
      />

      <div style={{ zIndex: 1, display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
        {Object.keys(themes).map((t) => (
          <button
            key={t}
            style={{
              backgroundColor: themes[t].card,
              color: themes[t].text,
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              fontWeight: theme === t ? "700" : "500",
              cursor: "pointer",
            }}
            onClick={() => setTheme(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <label style={{ fontWeight: "600" }}>
          <input
            type="checkbox"
            checked={usePomodoro}
            onChange={() => {
              setUsePomodoro(!usePomodoro);
              resetTimer();
            }}
          />{" "}
          Use Pomodoro (25 min)
        </label>
      </div>

      <div
        style={{
          backgroundColor: themes[theme].card,
          color: themes[theme].text,
          padding: "3rem 5rem",
          borderRadius: "20px",
          fontSize: "4rem",
          fontWeight: "700",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          marginBottom: "2rem",
          minWidth: "220px",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        {formatTime(usePomodoro ? Math.min(time, pomodoroTime) : time)}
      </div>

      <div className="timer-buttons" style={{ zIndex: 1, display: "flex", gap: "1rem" }}>
        <button className="btn start" onClick={startTimer}>
          Start
        </button>
        <button className="btn pause" onClick={pauseTimer}>
          Pause
        </button>
        <button className="btn reset" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default StudyRoom;
