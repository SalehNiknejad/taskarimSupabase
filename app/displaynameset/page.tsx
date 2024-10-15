import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changeDisplayName } from "../actions";

function displaynameset() {
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">تغییر نام کاربری</h1>
      <p className="text-sm text-foreground mt-3">
        نام کاربری که میخواهید در سایت نمایش داده شود را وارد کنید.
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="userName">نام</Label>
        <Input name="userName" placeholder="علی احمدی" required />

        <SubmitButton
          pendingText="در حال اعمال تغییرات..."
          formAction={changeDisplayName}
        >
          ویرایش نام کاربری
        </SubmitButton>
      </div>
    </form>
  );
}

export default displaynameset;
