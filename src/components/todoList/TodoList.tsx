"use client";
import { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import Task from "./Task";

export default function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Do the dishes" },
    { id: 2, text: "Study english" },
    { id: 3, text: "Deploy app" },
    { id: 4, text: "Workout" },
    { id: 5, text: "Read" },
  ]);

  const isTouch = () => {
    console.log("ontouchstart" in window || navigator.maxTouchPoints > 0)
    return "ontouchstart" in window || navigator.maxTouchPoints > 0
  }

  const moveTask = useCallback(
    (from: number, to: number) => {
      const updatedTasks = [...tasks];
      const [task] = updatedTasks.splice(from, 1);
      updatedTasks.splice(to, 0, task);
      setTasks(updatedTasks)
    },
    [tasks]
  );

  return (
    <DndProvider backend={isTouch() ? TouchBackend : HTML5Backend}>
      <ul className="bg-orange-500 w-[300px] rounded-md p-2 mx-auto flex flex-col gap-2">
        {tasks.map((task, index) => (
          <Task key={task.id} task={task} index={index} moveTask={moveTask} />
        ))}
      </ul>
    </DndProvider>
  );
}
