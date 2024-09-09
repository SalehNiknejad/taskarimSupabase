"use client";
import React, { useState } from "react";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { add_task } from "../actions";
import { Text_Area } from "@/components/ui/text-area";
import { ListPlus } from "lucide-react";
import { DatePicker } from "zaman";

const AddTask = () => {
  const [date, setDate] = useState("");
  return (
    <form className="flex-1 flex flex-col min-w-80">
      <div className="flex items-center">
        <ListPlus className="me-2" size={32} />
        <h1 className="text-2xl font-medium ">اضافه کردن تسک</h1>
      </div>

      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="title">عنوان</Label>
        <Input name="title" placeholder="عنوان تسک را وارد کنید" required />
        <Label htmlFor="description">توضیحات</Label>
        <Text_Area name="description" placeholder="درباره تسک توضیحی دهید" />
        <Label htmlFor="description" className="mt-2">
          تاریخ
        </Label>
        <DatePicker
          onChange={(e) =>
            setDate(
              new Intl.DateTimeFormat("fa-IR", {
                // weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(e.value)
            )
          }
          customShowDateFormat="DD MMMM YYYY"
          round="x2"
          weekends={[6]}
          inputClass="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <Input name="date" className="hidden" defaultValue={date} />
        <SubmitButton pendingText="در حال افزودن..." formAction={add_task}>
          افزودن
        </SubmitButton>
      </div>
    </form>
  );
};

export default AddTask;
