"use client";
import React from "react";
import { checkStateChangeTask, deleteTask } from "@/app/actions";
import { Label } from "../ui/label";
import { Square, SquareCheck } from "lucide-react";

function IsCompletedLabel(task: { taskId: number; isCompleted: boolean }) {
  return (
    <>
      <Label
        onClick={() => checkStateChangeTask(task.taskId, task.isCompleted)}
        className={`flex gap-1 font-medium text-base py-1  px-2 rounded-xl items-center ${task.isCompleted ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-100 " : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-100"}`}
      >
        {task.isCompleted ? <SquareCheck /> : <Square />}

        {task.isCompleted ? "انجام شده" : "انجام نشده"}
      </Label>
    </>
  );
}

export default IsCompletedLabel;
