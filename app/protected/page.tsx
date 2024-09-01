import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="  flex flex-col gap-6">
      <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
        <InfoIcon size="16" strokeWidth={2} />
        این صفحه برای محافظت از اطلاعات سایت در برابر نفوذ ها است
      </div>
      <h2 className="font-bold text-2xl mb-4">اطلاعات کاربری شما</h2>
      <pre
        className="text-xs font-mono p-3 rounded border max-h-80 overflow-auto"
        dir="ltr"
      >
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  );
}
