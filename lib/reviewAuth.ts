import type { cookies as cookiesFn } from "next/headers";

export const REVIEW_AUTH_COOKIE_NAME = "eeo_review_session";
const ONE_DAY_SECONDS = 60 * 60 * 24;

type CookieStore = Awaited<ReturnType<typeof cookiesFn>>;

function getRequiredReviewPassword(): string | null {
  const value = process.env.REVIEW_WORKSPACE_PASSWORD?.trim();
  return value ? value : null;
}

export function isReviewAuthEnabled(): boolean {
  return getRequiredReviewPassword() !== null;
}

export function isReviewAuthorizedCookieValue(cookieValue: string | null | undefined): boolean {
  const required = getRequiredReviewPassword();
  if (!required) return true;
  return cookieValue === required;
}

export function isReviewAuthorizedFromCookies(cookieStore: CookieStore): boolean {
  return isReviewAuthorizedCookieValue(cookieStore.get(REVIEW_AUTH_COOKIE_NAME)?.value);
}

export function getReviewAuthCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_DAY_SECONDS,
  };
}

/**
 * Lightweight reviewer identity for audit attribution.
 * Uses optional env overrides to avoid exposing secret cookie values.
 */
export function getReviewerIdentity() {
  return {
    reviewerId: process.env.REVIEW_WORKSPACE_REVIEWER_ID?.trim() || "reviewer_session",
    reviewerLabel:
      process.env.REVIEW_WORKSPACE_REVIEWER_LABEL?.trim() || "Authenticated reviewer",
  };
}
