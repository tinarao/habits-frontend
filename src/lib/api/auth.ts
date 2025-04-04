"use server";

import { cookies } from "next/headers";
import { getApiRoute } from ".";

const SESSION_COOKIE_NAME = "session";

export async function getSessionToken() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get(SESSION_COOKIE_NAME);
  if (!token) {
    return null;
  }

  return token;
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

  const data = await response.json()
  return data
}
