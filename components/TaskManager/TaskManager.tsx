import { createClient } from "@/utils/supabase/server";
import React from "react";

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
  console.log(data);
  // const displayname: displayReq = data?.findLast((a) => a);
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {data?.map((item: displayReq) => (
          <div className="w-64 h-48 border border-1 rounded-lg p-3 flex-col justify-between">
            <h2 className="font-extrabold text-wrap">{item.title}</h2>
            <p className="font-normal text-sm">{item.description}</p>
            <p className="font-light text-sm">{item.date}</p>
            <p className="font-light text-sm">
              {item.isCompleted ? "انجام شده" : "انجام نشده"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default TaskManager;
