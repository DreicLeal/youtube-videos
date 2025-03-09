"use client";
import { FormEvent, useState } from "react";

type IChatHistory = {
  role: string;
  content: string;
};

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<IChatHistory[]>([]);

  const apiRequest = async () => {
    try {
      const response = await fetch("/api/chatRequest", {
        method: "POST",
        body: JSON.stringify({
          chatMessage: { role: "user", content: message },
        }),
      });
      const data = await response.json();
      setChatHistory((prev) => [...prev, data]);
    } catch (e) {
      console.error(e);
    }
  };

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    apiRequest();
    setChatHistory((prev) => [...prev, { role: "user", content: message }]);
    setMessage("");
  };

  return (
    <div className="bg-white text-black rounded-md">
      <ul className="flex flex-col gap-2 items-center h-[500px] overflow-auto">
        {chatHistory.map((message, i) => (
          <li
            key={i}
            className={`${
              message.role === "user" ? "bg-cyan-500 text-end" : "bg-green-500"
            } w-full rounded-md p-2 my-2 w-[95%]`}
          >
            <h2 className="font-semibold">{message.role}</h2>
            <p>{message.content}</p>
          </li>
        ))}
      </ul>
      <form action="" onSubmit={sendMessage} className="flex p-2 bg-slate-950 gap-2">
        <input
          className="text-black w-full outline-0 px-2"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="w-fit p-2 rounded-md font-semibold text-white bg-green-500">enviar</button>
      </form>
    </div>
  );
}
