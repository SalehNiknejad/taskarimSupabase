import Link from "next/link";
import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup({ searchParams }: { searchParams: Message }) {
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">ساخت حساب</h1>
        <p className="text-sm text text-foreground">
          آیا حساب کاربری دارید؟{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            ورود به حساب
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">ایمیل</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="password">رمز ورود</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />
          <SubmitButton
            formAction={signUpAction}
            pendingText="در حال ساخت حساب برای شما..."
          >
            ساخت حساب
          </SubmitButton>
          <div dir="ltr">
            <FormMessage message={searchParams} />
          </div>
        </div>
      </form>
      {/* <SmtpMessage /> */}
    </>
  );
}
