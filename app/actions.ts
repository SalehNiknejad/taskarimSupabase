"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const changeDisplayName = async (formData: FormData) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userName = formData.get("userName") as string;

  const { data, error } = await supabase
    .from("userNames")
    .insert({
      displayName: userName,
      email: user?.email,
    })
    .select()
    .single();

  if (error) {
    encodedRedirect(
      "error",
      "/displaynameset",
      "تغییر نام کاربری با مشکل روبه‌رو شد"
    );
  }
  if (data) {
    encodedRedirect("success", "/", "نام کاربری تغییر یافت");
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const addTasks = async (formData: FormData) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const cardColor = formData.get("cardColor") as string;
  const priority = formData.get("priority") as string;

  const { data, error } = await supabase
    .from("allTask")
    .insert({
      date,
      authorID: user?.id,
      title,
      description,
      isCompleted: false,
      cardColor,
      priority,
    })
    .select()
    .single();

  if (data) {
    encodedRedirect("success", "/", "TaskAdded");
  }
  if (error) {
    encodedRedirect("error", "/", "AddTaskFailed");
  }
};

export const deleteTask = async (taskId: number) => {
  const supabase = createClient();

  const { error } = await supabase.from("allTask").delete().eq("id", taskId);

  if (error) {
    encodedRedirect("error", "/", "TaskDeletingFailed");
  } else encodedRedirect("success", "/", "TaskDeleted");
};

export const checkStateChangeTask = async (
  taskId: number,
  isCompleted: boolean
) => {
  const supabase = createClient();

  const { error, statusText } = await supabase
    .from("allTask")
    .update({ isCompleted: !isCompleted })
    .eq("id", taskId);

  if (!error) {
    encodedRedirect("error", "/", "TaskChangeStateSuccessful");
  } else encodedRedirect("success", "/", "TaskChangeStateFailed");
};

export const changeTask = async (formData: FormData) => {
  const supabase = createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const id = formData.get("id") as string;

  const { error } = await supabase
    .from("allTask")
    .update({
      title,
      description,
    })
    .eq("id", parseInt(id));

  if (!error) {
    encodedRedirect("success", "/", "TaskUpdated");
  }
  if (error) {
    encodedRedirect("error", "/", "TaskUpdatingFailed");
  }
};
