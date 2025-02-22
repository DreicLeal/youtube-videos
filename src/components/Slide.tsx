"use client";
import { useRef, useState } from "react";

export default function Slide() {
  const startX = useRef<number | null>(null);
  const [slideLeft, setSlideLeft] = useState(false);
  const [slideRight, setSlideRight] = useState(false);

  const handleStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleMove = (e: React.TouchEvent) => {
    if (startX.current) {
      const moveX = startX.current - e.touches[0].clientX;
      if (moveX < -40) {
        setSlideLeft(true);
        setSlideRight(false);
      }
      if (slideLeft && moveX > 20) {
        setSlideLeft(false);
      }
      if (slideRight && moveX < -20) {
        setSlideRight(false);
      }

      if (moveX > 40) {
        setSlideRight(true);
        setSlideLeft(false);
      }
    }
  };

  return (
    <div
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      className="flex items-center justify-center relative overflow-hidden rounded-md w-[240px]"
    >
      <div
        className={`${
          slideLeft && "translate-x-0"
        } p-4 absolute translate-x-[-70px] left-0 bg-green-500 w-[70px] text-center transition duration-300`}
      >
        Left
      </div>
      <div
        className={`p-4 ${slideLeft && "translate-x-[70px]"} ${
          slideRight && "translate-x-[-70px]"
        } bg-slate-500 w-full text-center transition duration-300`}
      >
        Center
      </div>
      <div
        className={`${
          slideRight && "translate-x-0"
        } p-4 right-0 absolute bg-blue-500 w-[70px] translate-x-[70px] text-center transition duration-300`}
      >
        Right
      </div>
    </div>
  );
}
