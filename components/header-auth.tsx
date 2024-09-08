import Link from "next/link";
import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const {
    data: { user },
  } = await createClient().auth.getUser();
  const supabase = createClient();
  type displayReq = {
    id: number;
    email: string;
    displayName: string;
  };
  const { data } = await supabase
    .from("userNames")
    .select("*")
    .eq("email", user?.email);
  const displayname: displayReq = data?.findLast((a) => a);
  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge
              variant={"default"}
              className="font-normal pointer-events-none"
            >
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return user ? (
    <>
      <div className="flex items-center gap-4">
        <Link href={"/displaynameset"}>
          {displayname.displayName ?? user?.email}
        </Link>

        <form action={signOutAction}>
          <Button type="submit" variant={"outline"}>
            خروج از حساب
          </Button>
        </form>
      </div>
    </>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">ورود به حساب</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">ساخت حساب</Link>
      </Button>
    </div>
  );
}
