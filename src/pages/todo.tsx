import AddTodoCard from "@/components/add-todo-card";
import TodoCard from "@/components/todo-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Todo } from "@/lib/xata";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { MoreHorizontalIcon } from "lucide-react";
import React from "react";

const todo = () => {
  const { isLoaded, user } = useUser();

  const _todos = useQuery({
    queryKey: ["todos.all"],
    queryFn: async () => {
      const res = await fetch("/api/get-todos", {
        method: "POST",
        body: JSON.stringify({
          target_email: user?.emailAddresses[0].emailAddress,
        }),
      });
      const data = await res.json();
      return data as Todo[];
    },
    refetchOnWindowFocus: false,
  });

  console.log(_todos);

  return (
    <>
      <main className="py-10">
        <div className="flex justify-between items-center">
          <h1>Todo Page</h1>
          <AddTodoCard refetchTodos={_todos.refetch} />
        </div>

        <div className="flex flex-col gap-5">
          {_todos.isLoading &&
            Array(3)
              .fill(0)
              .map((_, i) => <Skeleton className="w-full h-24" />)}

          {_todos.isSuccess &&
            _todos.data.map((todo) => (
              <TodoCard refetchData={_todos.refetch} data={todo} />
            ))}
        </div>
      </main>
    </>
  );
};

export default todo;
