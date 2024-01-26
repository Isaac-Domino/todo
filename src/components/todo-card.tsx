import React, { FormEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { Todo } from "@/lib/xata";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

type TodoCardProps = {
  data: Todo;
  refetchData: () => void;
};

const TodoCard = ({ data, refetchData }: TodoCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const onTodoUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const task_name = formData.get("title");

    try {
      toast.loading("Updating Todo... Please wait");

      const res = await fetch("/api/update-todo", {
        method: "POST",
        body: JSON.stringify({
          id: data.id,
          todo: {
            ...data,
            task_name,
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update Todo...");
      }

      toast.success("Successfully update data");
      setIsEditing(false);
      refetchData();
    } catch (error) {
      toast.error("Failed to update Todo");
    }
  };

  const onStatusUpdate = async (status: string) => {
    toast.loading("Updating status...");

    try {
      const res = await fetch("/api/update-todo", {
        method: "POST",
        body: JSON.stringify({
          id: data.id,
          todo: {
            ...data,
            status,
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to  update status");
      }
      toast.success("Successfully updated");
      refetchData();
    } catch (error) {
      toast.error("Erorr updating status");
    }
  };

  const onTodoRemove = async () => {
    try {
      const res = await fetch("/api/delete-todo", {
        method: "POST",
        body: JSON.stringify({
          id: data.id,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to Delete status");
      }
      toast.success("Successfully Deleted");
      setIsRemoving(true);
      refetchData();
    } catch (error) {
      toast.error("Erorr Deleting status");
    }
  };
  return (
    <>
      <div className="p-5 border-2 border-border rounded-xl flex items-center justify-between">
        <p>{data.task_name}</p>
        <div className="flex items-center gap-2 w-[200px]">
          <Select value={data.status as string} onValueChange={onStatusUpdate}>
            <SelectTrigger>
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="done">Done</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="on-going">On-going</SelectItem>
              <SelectItem value="dropped">Dropped</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                Edit Content
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsRemoving(true)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Todo</DialogTitle>
          </DialogHeader>
          <form onSubmit={onTodoUpdate} className="flex flex-col gap-2">
            <Input name="title" placeholder="Add Todo Title" />
            <Button>ADD</Button>
          </form>
        </DialogContent>
      </Dialog>
      <AlertDialog onOpenChange={setIsRemoving} open={isRemoving}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {" "}
              Do you want to remove this Task?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Please proceed with caution
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild onClick={() => onTodoRemove()}>
              <Button variant={"destructive"}>Remove</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TodoCard;
