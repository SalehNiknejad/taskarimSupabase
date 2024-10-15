import Link from "next/link";
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">ورود کاربر</h1>
      <p className="text-sm text-foreground">
        حساب کاربری ندارید؟{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          ساختن حساب
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">ایمیل</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">رمز ورود</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            رمز عبور را فراموش کرده اید؟
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton pendingText="در حال ورود..." formAction={signInAction}>
          ورود
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
