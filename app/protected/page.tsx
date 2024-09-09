import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { GemIcon, UserPen, ZapIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();
  type displayReq = {
    id: number;
    email: string;
    displayName: string;
  };
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  const { data } = await supabase
    .from("userNames")
    .select("*")
    .eq("email", user?.email);
  const displayname: displayReq = data?.findLast((a) => a);

  return (
    <div className="  flex flex-col gap-6">
      <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
        <GemIcon size="16" strokeWidth={2} />
        خوش آمدید به ابزار مدیریت تسک ها و امور تسکریم{" "}
      </div>
      <h2 className="font-bold text-2xl my-2">اطلاعات کاربری شما</h2>
      {displayname.displayName && (
        <h4 className="font-bold text-base ">
          نام نمایشی: {displayname.displayName}
        </h4>
      )}
      {!displayname.displayName && (
        <a href="/displaynameset">
          <Button
            className="font-light text-sm"
            variant={"secondary"}
            size={"sm"}
          >
            <UserPen className="me-2" /> وارد کردن نام نمایشی
          </Button>
        </a>
      )}
      <h4 className="font-bold text-base ">ایمیل: {user.email}</h4>
      <a href="/">
        <Button className="font-black text-base">
          <ZapIcon className="me-2" /> رفتن به تسک منیجر
        </Button>
      </a>
    </div>
  );
}
