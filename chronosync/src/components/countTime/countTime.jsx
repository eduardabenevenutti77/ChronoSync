import "./style-count.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CountTime() {
  const [time, setTime] = useState(0);
  const [input, setInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const savedEndTime = localStorage.getItem("timer-endTime");
    const savedIsRunning = localStorage.getItem("timer-isRunning");

    if (savedEndTime && savedIsRunning === "true") {
      const remainingTime = Math.max(0, Math.floor((savedEndTime - Date.now()) / 1000));
      if (remainingTime > 0) {
        setTime(remainingTime);
        setIsRunning(true);
      } else {
        localStorage.removeItem("timer-endTime");
        localStorage.removeItem("timer-isRunning");
      }
    }
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          clearInterval(id);
          setIsRunning(false);
          localStorage.removeItem("timer-endTime");
          localStorage.removeItem("timer-isRunning");
          return 0;
        }
        return newTime;
      });
    }, 1000);

    setIntervalId(id);
    return () => clearInterval(id);
  }, [isRunning]);

  const start = () => {
    const parsedTime = parseInt(input);
    if (!isNaN(parsedTime) && parsedTime > 0) {
      const totalTime = parsedTime * 60;
      const endTime = Date.now() + totalTime * 1000;
      localStorage.setItem("timer-endTime", endTime);
      localStorage.setItem("timer-isRunning", "true");
      setTime(totalTime);
      setIsRunning(true);
      setInput("");
    } else {
      toast.warn("Por favor, insira um valor válido!");
    }
  };

  const pause = () => {
    clearInterval(intervalId);
    localStorage.setItem("timer-endTime", Date.now() + time * 1000);
    localStorage.setItem("timer-isRunning", "false");
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(intervalId);
    localStorage.removeItem("timer-endTime");
    localStorage.removeItem("timer-isRunning");
    setIsRunning(false);
    setTime(0);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="timer-container">
      <div className="input-container">
        <input
          type="number"
          value={input}
          onChange={handleInputChange}
          placeholder="Digite o tempo em minutos"
          disabled={isRunning}
        />
        <button className="buttonStyle" onClick={start}>
          Iniciar
        </button>
      </div>

      <div className="countdown">
        <h2>{time > 0 ? formatTime(time) : "00:00:00"}</h2>
      </div>

      <div className="controls">
        {isRunning ? (
          <button className="buttonStyle" onClick={pause}>
            Pausar
          </button>
        ) : (
          <button className="buttonStyle" onClick={() => setIsRunning(true)}>
            Continuar
          </button>
        )}
        <button className="buttonStyle" onClick={reset}>
          Reiniciar
        </button>
      </div>
    </div>
  );
}