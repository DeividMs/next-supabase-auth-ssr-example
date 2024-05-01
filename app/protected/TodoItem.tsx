"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import { TrashIcon } from "lucide-react";
import { Todo } from "@/types/todo";

export function TodoItem({ todo, onDelete }: { todo: Todo, onDelete: (id: string) => void }) {
  return (
    <div key={todo.id} className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Checkbox id={`todo-${todo.id}`} />
        <label className="text-gray-700 dark:text-gray-400" htmlFor={`todo-${todo.id}`}>
          {todo.task}
        </label>
      </div>
      <Button
        className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500"
        size="icon"
        variant="ghost"
      >
        <TrashIcon className="h-5 w-5" onClick={() => onDelete(todo.id)} />
      </Button>
    </div>
  );
}
