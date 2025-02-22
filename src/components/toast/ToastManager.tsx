"use client";

import { FormEvent, useRef, useState } from "react";
import Toast from "./Toast";

export default function ToastManager() {
  const [formTitle, setFormTitle] = useState<string>("");
  const [formMessage, setFormMessage] = useState<string>("");
  const [toastTitle, setToastTitle] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string>("");

  const [showToast, setShowToast] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const remainingTimeRef = useRef(3000);

  const resumeToast = () => {
    startTimeRef.current = Date.now();

    timeoutRef.current = setTimeout(
      () => setShowToast(false),
      remainingTimeRef.current
    );
  };

  const freezeToast = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      if (startTimeRef.current) {
        const elapsedTime = Date.now() - startTimeRef.current;
        remainingTimeRef.current -= elapsedTime;
      }
    }
  };

  const callToast = () => {
    remainingTimeRef.current = 3000;
    startTimeRef.current = Date.now();
    setFormTitle("");
    setFormMessage("");
    setShowToast(true);

    timeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setToastTitle(formTitle);
    setToastMessage(formMessage);
    callToast();
  };

  return (
    <div className="w-full h-[100vh] bg-slate-600 p-4">
      <form
        className="flex flex-col items-center justify-center mx-auto my-0 p-4 gap-2 bg-slate-800 w-fit rounded-md"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label className="flex flex-col">
          Title:
          <input
            className="text-black rounded-md outline-none pl-2"
            type="text"
            placeholder="Type a title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          Message:
          <input
            className="text-black rounded-md outline-none pl-2"
            type="text"
            placeholder="Type a message"
            value={formMessage}
            onChange={(e) => setFormMessage(e.target.value)}
          />
        </label>
        <button className="bg-slate-500 w-[90%] rounded-md" type="submit">
          Show Toast
        </button>
      </form>
      {showToast && (
        <div
          className="fixed top-3 right-3"
          onMouseEnter={freezeToast}
          onMouseLeave={resumeToast}
        >
          <Toast title={toastTitle} message={toastMessage} />
        </div>
      )}
    </div>
  );
}
