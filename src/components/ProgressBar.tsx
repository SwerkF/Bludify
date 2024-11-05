import React, { useRef, useCallback, useState } from "react";
import { throttle } from "lodash";

interface ProgressBarProps {
  progress: number;
  setProgress: (progress: number) => void;
  min: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  setProgress,
  min,
  max,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const updateProgress = useCallback(
    throttle((newProgress) => {
      setProgress(Math.min(Math.max(newProgress, 0), 100));
    }, 10),
    []
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const rect = progressBarRef.current!.getBoundingClientRect();
      const newProgress = ((e.clientX - rect.left) / rect.width) * 100;
      requestAnimationFrame(() => updateProgress(newProgress));
    }
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="relative w-full flex items-center gap-2 text-xs text-gray-400">
      <div
        className="relative max-w-xl mx-auto w-full h-1.5 bg-gray-300 rounded-md relative"
        ref={progressBarRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div
          className="absolute top-0 left-0 h-full bg-purple-600 rounded-md"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute h-5 w-2 bg-purple-500 rounded-md -translate-x-1/3 -translate-y-1/3"
          style={{ left: `${progress}%` }}
        />
        <input
          id="range"
          type="range"
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          value={progress}
          min={min}
          max={max}
          step={0.1}
          onChange={(e) => updateProgress(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
