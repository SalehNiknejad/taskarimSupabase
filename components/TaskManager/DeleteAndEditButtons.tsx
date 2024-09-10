"use client";
import { EditIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { deleteTask } from "@/app/actions";

function DeleteAndEditButtons(taskId: { taskId: number }) {
  return (
    <>
      <Button
        children={<EditIcon size={24} />}
        variant={"secondary"}
        type="button"
        size={"icon"}
        className="me-3"
      />
      <Button
        children={<Trash2Icon size={24} />}
        variant={"destructive"}
        type="button"
        size={"icon"}
        onClick={() => deleteTask(taskId.taskId)}
      />
    </>
  );
}

export default DeleteAndEditButtons;
