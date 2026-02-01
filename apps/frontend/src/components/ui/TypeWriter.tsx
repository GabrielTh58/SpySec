import { useEffect, useState, useRef } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

export function Typewriter({ 
  text, 
  speed = 15, 
  onComplete, 
  className = "" 
}: TypewriterProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    // Reset se o texto mudar
    setVisibleCount(0);
    startedRef.current = false;
  }, [text]);

  useEffect(() => {
    // Evita loops se o texto for vazio
    if (!text) return;

    const intervalId = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < text.length) {
          return prev + 1;
        }
        
        clearInterval(intervalId);
        if (!startedRef.current && onComplete) {
          startedRef.current = true;
          onComplete();
        }
        return prev;
      });
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed, onComplete]);

  return (
    <span className={`whitespace-pre-wrap ${className}`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          style={{
            opacity: index < visibleCount ? 1 : 0,
            transition: "opacity 0.1s ease-in-out", 
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}