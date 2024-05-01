/**
 * This componet was created by v0.dev: https://v0.dev/r/vp4c4Hsu7wn
 * 
 * How it was installed in this project. 
 * (Note: No need to install it again. If the project contains components.json file, you can find the component id in that file.)
 *  
 *   ```bash
 *      # init the project   
 *      npx v0@latest init
 * 
 *      # create the component
 *      npx v0 add dCzbTSFbhBB
 *   ```
 * 
 * 
 */
"use client";

import { Input } from "@/components/ui/input"
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { Todo } from "@/types/todo";
import { TodoItem } from "./TodoItem";

export default function TodoList({ todos }: { todos: Todo[] }) {
  const [todosState, setTodosState] = useState<Todo[]>(todos);
  const [inputValue, setInputValue] = useState("")
  const supabase = createClient();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this todo?") === false) {
      return;
    }
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) {
      console.error("Error deleting todo", error);
      return;
    }

    setTodosState((prev) => prev.filter((todo) => todo.id !== id));
  }

  const handleAddTodo = async () => {
    if (!inputValue) {
      return;
    }

    const {data: sessionData, error: sessionError} =await supabase.auth.getSession()
    
    if (sessionError || !sessionData) {
      console.error("Error getting session", sessionError);
      return;
    }

    const { session } = sessionData;
    const { data, error } = await supabase.from("todos")
      .insert({
        task: inputValue,
        user_id: session?.user.id,
      })
      .select("*")

    if (error) {
      console.error("Error inserting todo", error);
      return;
    }
    
    setTodosState((prev) => [...prev, data[0]]);
    setInputValue("");
  }

  const handleInputChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
    setInputValue(e.target.value);
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Todo List</h1>
        <div className="space-y-4">
        {
          todosState.map((todo: Todo) => (
            <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
          ))
        }
        </div>
        <div className="mt-6">
          <Input 
            className="w-full" 
            placeholder="Add a new todo and press Enter" 
            value={inputValue} 
            onChange={handleInputChage} 
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
    </div>
  )
}
