"use client";
import { useState } from "react";
import { checkStateChangeTask } from "@/app/actions";
import { Label } from "../ui/label";
import { Square, SquareCheck } from "lucide-react";

function IsCompletedLabel(task: { taskId: number; isCompleted: boolean }) {
  const [fakeIscomp, setFakeIsComp] = useState(task.isCompleted);
  return (
    <>
      <Label
        onClick={() => {
          setFakeIsComp(!task.isCompleted),
            checkStateChangeTask(task.taskId, task.isCompleted);
        }}
        className={` cursor-pointer flex gap-1 font-medium text-base py-1  px-2 rounded-xl items-center ${fakeIscomp ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-100 " : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-100"}`}
      >
        {fakeIscomp ? <SquareCheck /> : <Square />}

        {fakeIscomp ? "انجام شده" : "انجام نشده"}
      </Label>
    </>
  );
}

export default IsCompletedLabel;
