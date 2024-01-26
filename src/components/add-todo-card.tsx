import React, { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { Todo } from "@/lib/xata";
import { useUser } from "@clerk/nextjs";

type AddTodoCardProps = {
  refetchTodos: () => void;
};

const AddTodoCard = ({ refetchTodos }: AddTodoCardProps) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const formTitle = formData.get("title");

    toast.loading("Adding Todo");

    if (!isSignedIn && !isLoaded) {
      toast.error("Clerk is not yet loaded");
      return;
    }

    try {
      const res = await fetch("/api/add-todo", {
        method: "POST",
        body: JSON.stringify({
          task_name: formTitle as string,
          email: user?.emailAddresses[0].emailAddress,
          status: "pending",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add todo");
      }

      toast.dismiss();
      toast.success("Todo added");
      setIsAdding(false);
      refetchTodos();
    } catch (error) {
      toast.error("Error!");
    }
  };

  return (
    <>
      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogTrigger asChild>
          <Button>Add Todo</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Todo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input name="title" placeholder="Add Todo Title" />
            <Button>ADD</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTodoCard;
