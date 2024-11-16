import DeleteAndEditButtons from "./DeleteAndEditButtons";
import IsCompletedLabel from "./IsCompletedLabel";
import getColorHexFromName from "./utils/getColorHexFromName";
import PriorityFlags from "./PriorityFlags";
import { createClient } from "@/utils/supabase/server";
import { Button } from "../ui/button";
import { PlusCircleIcon } from "lucide-react";
import { TaskReadProps } from "./TaskManagerModel";

async function TaskManager() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  const supabase = createClient();

  const { data } = await supabase
    .from("allTask")
    .select("*")
    .eq("authorID", user?.id);

  return (
    <>
      <main className="w-full">
        <a href="/add-task">
          <Button
            type="button"
            variant={"secondary"}
            size={"sm"}
            className="mb-2"
          >
            <PlusCircleIcon size={24} className="ml-1" />
            <span> مورد جدید</span>
          </Button>
        </a>
        <div className="flex flex-wrap gap-2">
          {data?.map((item: TaskReadProps) => (
            <div
              className={`${getColorHexFromName(item.cardColor)} max-sm:w-[90vw] lg:w-80	max-lg:w-72 h-auto border border-1 rounded-lg p-3 flex flex-col justify-between`}
            >
              <div>
                <h2 className="font-extrabold ">{item.title}</h2>
                <p className="font-normal text-sm">{item.description}</p>
              </div>
              <div className="flex justify-between items-end mt-6">
                <div>
                  <div className="flex mb-0.5">
                    <PriorityFlags priority={item.priority} />
                  </div>
                  <p className="font-light text-sm mb-1">{item.date}</p>
                  <IsCompletedLabel
                    taskId={item.id}
                    isCompleted={item.isCompleted}
                  />
                </div>
                <div>
                  <DeleteAndEditButtons taskinfo={item} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default TaskManager;
