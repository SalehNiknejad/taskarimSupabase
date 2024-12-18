"use client";

import getColorHexFromName from "@/components/TaskManager/utils/getColorHexFromName";
import { useState } from "react";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addTasks } from "../../actions";
import { Text_Area } from "@/components/ui/text-area";
import { Check, ListPlus } from "lucide-react";
import { DatePicker } from "zaman";
import { Slider } from "@/components/ui/slider";
import PriorityFlags from "@/components/TaskManager/PriorityFlags";

const AddTask = () => {
  const [date, setDate] = useState("");
  const [cardColor, setCardColor] = useState("black");
  const [priority, setPriority] = useState([0]);
  const colors = ["black", "blue", "red", "green", "yellow"];

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
        <Label className="mt-2">تاریخ</Label>
        <DatePicker
          onChange={(e) => {
            setDate(
              new Intl.DateTimeFormat("fa-IR", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(e.value)
            );
          }}
          customShowDateFormat="DD MMMM YYYY"
          round="x2"
          weekends={[6]}
          defaultValue={Date.now()}
          inputClass="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <Label className="mt-2">رنگ کارت</Label>
        <div className="flex justify-center w-full mb-4">
          {colors.map((color) => (
            <div
              className={`${getColorHexFromName(color)} flex justify-center items-center w-10 h-10 m-2 rounded-full border-2 border-gray-400 dark:border-gray-700`}
              onClick={() => setCardColor(color)}
            >
              {cardColor === color && <Check size={30} />}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <Label>اولویت</Label>
          <div className="flex">
            <PriorityFlags priority={priority[0]} />
          </div>
        </div>
        <Slider
          dir="rtl"
          value={priority}
          max={3}
          min={0}
          step={1}
          onValueChange={(v) => setPriority(v)}
          className="mt-3 mb-4 "
        />
        <Input
          name="date"
          className="hidden"
          defaultValue={
            date ||
            new Intl.DateTimeFormat("fa-IR", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(Date.now())
          }
        />
        <Input name="cardColor" className="hidden" defaultValue={cardColor} />
        <Input name="priority" className="hidden" defaultValue={priority[0]} />
        <SubmitButton pendingText="در حال افزودن..." formAction={addTasks}>
          افزودن
        </SubmitButton>
      </div>
    </form>
  );
};

export default AddTask;
