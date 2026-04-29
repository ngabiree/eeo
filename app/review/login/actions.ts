"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  getReviewAuthCookieOptions,
  isReviewAuthEnabled,
  isReviewAuthorizedCookieValue,
  REVIEW_AUTH_COOKIE_NAME,
} from "@/lib/reviewAuth";

export async function loginToReviewWorkspace(formData: FormData) {
  if (!isReviewAuthEnabled()) {
    redirect("/review");
  }

  const password = formData.get("password");
  const candidate = typeof password === "string" ? password : null;
  if (!isReviewAuthorizedCookieValue(candidate)) {
    redirect("/review/login?error=invalid");
  }

  const cookieStore = await cookies();
  cookieStore.set(REVIEW_AUTH_COOKIE_NAME, String(candidate), getReviewAuthCookieOptions());
  redirect("/review");
}
