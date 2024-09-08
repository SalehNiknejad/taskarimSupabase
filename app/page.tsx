import TaskManager from "@/components/TaskManager/TaskManager";
import Hero from "@/components/hero";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <>{user ? <TaskManager /> : <Hero />}</>;
}
