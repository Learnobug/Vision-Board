"use client"
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { parse } from "path";

export default function Home() {
  const router = useRouter();
  const session = useSession();
  
  if (session.status == "unauthenticated") {
    router.push("/api/auth/signin");
  }
  useEffect(()=>{
    if(session.data){
      localStorage.setItem("userId",session.data?.user.id);
    }
  }
  ,[session.data])

  function generateRandomString(length:number) {
    const characters = '123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  const createBoard = async () => {
    const boardId = generateRandomString(6);
    const userId = localStorage.getItem("userId");
    const Boardid = parseInt(boardId);
    const BoardState = "";
    const UserID = parseInt(userId);
    const res = await fetch(`/api/board/${boardId}`, {
      method: "POST",
      body: JSON.stringify({ BoardState, userId: UserID, boardId: Boardid }),
    });
    const data = await res.json();
    console.log(data);
    router.push(`/board/${boardId}`);
  }
   return (<div>
    you are signed in
    <button onClick={createBoard}>Create Board</button>
   </div>)
}

