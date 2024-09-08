import { createClient } from "@/utils/supabase/server";
import React from "react";
import { Label } from "../ui/label";

async function TaskManager() {
  const {
    data: { user },
  } = await createClient().auth.getUser();
  const supabase = createClient();
  type displayReq = {
    id: number;
    date: string;
    title: string;
    description: string;
    isCompleted: boolean;
    autherID: number;
  };

  const { data } = await supabase
    .from("AllTasks")
    .select("*")
    .eq("authorID", user?.id);
  // const displayname: displayReq = data?.findLast((a) => a);
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {data?.map((item: displayReq) => (
          <div className="w-72 h-48 border border-1 rounded-lg p-3 flex flex-col justify-between">
            <div>
              <h2 className="font-extrabold text-wrap">{item.title}</h2>
              <p className="font-normal text-sm">{item.description}</p>
            </div>
            <div>
              <p className="font-light text-sm mb-1">{item.date}</p>
              <Label
                className={`font-medium text-sm py-0.5 px-3 rounded-2xl ${item.isCompleted ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-100 " : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-100"}`}
              >
                {item.isCompleted ? "انجام شده" : "انجام نشده"}
              </Label>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TaskManager;
