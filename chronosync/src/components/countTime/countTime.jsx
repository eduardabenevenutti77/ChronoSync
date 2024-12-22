import "./style-count.css";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

export default function CountTime() {
    const [time, setTime] = useState(0); // Tempo restante em segundos
    const [input, setInput] = useState(""); // Valor do input
    const [isRunning, setIsRunning] = useState(false); // Se o timer está em execução
    const [intervalId, setIntervalId] = useState(null); // ID do intervalo para controle
    const [inputType, setInputType] = useState("number"); // Tipo do input

    useEffect(() => {
        if (time === 0 || !isRunning) return;

        // Inicia a contagem regressiva
        const id = setInterval(() => {
            setTime((prevTime) => prevTime - 1); 
        }, 1000);

        setIntervalId(id);

        return () => clearInterval(id);
    }, [time, isRunning]);

    const start = () => {
        const parsedTime = parseInt(input);

        if (!isNaN(parsedTime) && parsedTime > 0) {
            if (parsedTime >= 60) {
                // Se o valor for maior ou igual a 60, trata-se de minutos
                const hours = Math.floor(parsedTime / 60); // Obtém as horas
                const minutes = parsedTime % 60; // Obtém os minutos restantes
                setTime(hours * 3600 + minutes * 60); // Converte para segundos
            } else {
                // Caso contrário, trata-se de minutos
                setTime(parsedTime * 60); // Converte minutos para segundos
            }

            setIsRunning(true);
            setInput(""); // Limpa o input após iniciar
        } else {
            toast.warn('Por favor, insira um valor válido!');
        }
    };

    const pause = () => {
        clearInterval(intervalId);
        setIsRunning(false); // Pausa o timer
    };

    const reset = () => {
        clearInterval(intervalId);
        setIsRunning(false);
        setTime(0); // Reinicia o contador
        setInputType("number"); // Permite ao usuário inserir um novo valor
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600); // Calcula as horas
        const minutes = Math.floor((time % 3600) / 60); // Calcula os minutos
        const seconds = time % 60; // Calcula os segundos
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const continueTimer = () => {
        setIsRunning(true); // Retoma o timer sem reiniciar
    };

    // Estilo condicional para os números no final
    const timeColor = time <= 10 ? 'red' : 'black';  // Muda a cor para vermelho quando restar 10 ou menos segundos

    return (
        <div className="timer-container">
            <div className="input-container">
                <input
                    type={inputType}
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Digite o tempo (minutos ou horas)"
                    disabled={isRunning} // Desabilita o input enquanto o timer está rodando
                />
                <button className="buttonStyle" onClick={start}>Iniciar</button>
            </div>

            <div className="countdown">
                <h2 style={{ color: timeColor }}>
                    {time > 0 ? formatTime(time) : "00:00:00"}
                </h2>
                {time === 0 && !isRunning}
            </div>

            <div className="controls">
                {isRunning ? (
                    <button className="buttonStyle" onClick={pause}>Pausar</button>
                ) : (
                    <button className="buttonStyle" onClick={continueTimer}>Continuar</button>
                )}
                <button className="buttonStyle" onClick={reset}>Reiniciar</button>
            </div>
        </div>
    );
}
