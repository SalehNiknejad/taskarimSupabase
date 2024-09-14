"use client";
import { EditIcon, ListPlus, Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { addTasks, changeTask, deleteTask } from "@/app/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Text_Area } from "../ui/text-area";
import { SubmitButton } from "../submit-button";
import { DatePicker } from "zaman";
import { TaskReadProps } from "./TaskManagerModel";
import { useRouter } from "next/navigation";

function DeleteAndEditButtons(task: { taskinfo: TaskReadProps }) {
  const router = useRouter();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            children={<EditIcon size={24} />}
            variant={"secondary"}
            type="button"
            size={"icon"}
            className="me-3"
            color="#FFDE21"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-content " align="center">
          {" "}
          <form className="flex-1 flex flex-col min-w-80" dir="rtl">
            <Label className=" font-bold text-lg" children="اعمال تغییرات" />
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-4">
              <Label htmlFor="title">عنوان</Label>
              <Input
                name="title"
                placeholder="عنوان تسک را وارد کنید"
                required
                defaultValue={task.taskinfo.title}
              />
              <Label htmlFor="description">توضیحات</Label>
              <Text_Area
                name="description"
                placeholder="درباره تسک توضیحی دهید"
                defaultValue={task.taskinfo.description}
              />
              <Input
                name="id"
                className="hidden"
                defaultValue={task.taskinfo.id}
              />
              <DropdownMenuItem className="w-[100%]">
                <SubmitButton className="w-full" formAction={changeTask}>
                  ویرایش
                </SubmitButton>
              </DropdownMenuItem>
            </div>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        children={<Trash2Icon size={24} />}
        variant={"destructive"}
        type="button"
        size={"icon"}
        onClick={() => deleteTask(task.taskinfo.id)}
      />
    </>
  );
}

export default DeleteAndEditButtons;
