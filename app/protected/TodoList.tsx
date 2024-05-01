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

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function TodoList() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching todos", error);
    return;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Todo List</h1>
        <div className="space-y-4">
        {
          todos.map((todo: any) => (
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
                <TrashIcon className="h-5 w-5" />
              </Button>
            </div>
          ))
          }
        </div>
        <div className="mt-6">
          <Input className="w-full" placeholder="Add a new todo" />
        </div>
      </div>
    </div>
  )
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
