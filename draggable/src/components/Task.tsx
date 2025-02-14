import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

type ITask = {
  id: number;
  text: string;
};

type ITaskProps = {
  task: ITask;
  index: number;
  moveTask: (from: number, to: number) => void;
};

export default function Task({ task, index, moveTask }: ITaskProps) {
  const taskRef = useRef<HTMLLIElement | null>(null)
  
    const [, drag] = useDrag({ type: "TASK", item: { index } });

  const [, drop] = useDrop({
    accept: "TASK",
    hover: (draggableItem: { index: number }) => {
      if (draggableItem.index !== index) {
        moveTask(draggableItem.index, index);
        draggableItem.index = index;
      }
    },
  });

drag(drop(taskRef))

  return <li className="bg-white text-slate-800 p-2 rounded-md font-semibold" ref={taskRef}>{task.text}</li>;
}
