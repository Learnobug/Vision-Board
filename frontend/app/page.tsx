"use client"
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const session = useSession();
  
  if (session.status == "unauthenticated") {
    router.push("/api/auth/signin");
  }
  localStorage.setItem("userId",session.data?.user.id);
   return (<div>
    you are signed in
   </div>)
}

