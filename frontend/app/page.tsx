"use client";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { parse } from "path";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const session = useSession();
  const [boards, setBoards] = useState<{ BoardId: number; name: string }[]>([]);

  if (session.status == "unauthenticated") {
    router.push("/api/auth/signin");
  }
  useEffect(() => {
    if (session.data) {
      // @ts-ignore
      localStorage.setItem("userId", session.data?.user.id);
    }
  }, [session.data]);

  useEffect(() => {
    const fetchData = async () => {
      const board = await fetch("/api/board", {
        method: "POST",
        body: JSON.stringify({ userId: localStorage.getItem("userId") }),
      });
      const data = await board.json();
      setBoards(data);
    };
    fetchData();
  }, []);

  function generateRandomString(length: number) {
    const characters = "123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
  const createBoard = async () => {
    const boardId = generateRandomString(6);
    const userId = localStorage.getItem("userId");
    const Boardid = parseInt(boardId);
    const BoardState = "";
    // @ts-ignore
    const UserID = parseInt(userId);
    const res = await fetch(`/api/board/${boardId}`, {
      method: "POST",
      body: JSON.stringify({ BoardState, userId: UserID, boardId: Boardid }),
    });
    const data = await res.json();
    console.log(data);
    router.push(`/board/${boardId}`);
  };
  return (
    <div className="w-full h-screen p-20">
      <div className="w-40">
        <button
          className="w-40 h-24 rounded-md border-black border-2 flex justify-center items-center"
          onClick={createBoard}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
        <h1 className="text-center mt-2">Blank Board</h1>
      </div>
      <div className="grid grid-cols-5 gap-4 mt-10">

        {boards && boards.map((board) => (
          // eslint-disable-next-line react/jsx-key
          <Link href={`/board/${board.BoardId}`}>
            <div
              key={board.BoardId}
              className="w-40 h-24 rounded-md border-black border-2 flex justify-center items-center"
              onClick={() => router.push(`/board/${board.BoardId}`)}
            >
              <h1>{board.name}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
