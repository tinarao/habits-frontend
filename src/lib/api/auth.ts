"use server";

import { cookies } from "next/headers";
import { getApiRoute } from ".";
import { User } from "@/types/types";

const SESSION_COOKIE_NAME = "session";

export async function getSessionToken() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get(SESSION_COOKIE_NAME);
  if (!token) {
    throw new Error("Unauthorized")
  }

  return token;
}

export async function removeToken() {
  const cookieStorage = await cookies();
  cookieStorage.delete(SESSION_COOKIE_NAME);
}

export async function verify() {
  const sessionCookie = await getSessionToken();
  if (!sessionCookie) {
    throw new Error("Ошибка авторизации");
  }

  const route = getApiRoute("/api/auth/me");
  const response = await fetch(route, {
    headers: {
      Cookie: `${sessionCookie.name}=${sessionCookie.value}`,
    },
  });

  const data: { user: User } = await response.json()
  return data.user
}
