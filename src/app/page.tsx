import { cookies } from "next/headers";
import { verify } from "./lib/api/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // redirect("http://localhost:3000/api/auth/login/yandex")
  return (
    <div className="bg-red-400">param pam pam</div>
  );
}
