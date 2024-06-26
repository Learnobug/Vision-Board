"use client"
import { useDraw } from "@/hooks/useDraw";
import Image from "next/image";

export default function Home() {
  const {canvasRef}=useDraw()

  return (
    <div  className="w-screen h-screen bg-white flex justify-center items-center">
      <canvas ref={canvasRef} width={750} height={550} className="border border-black rounded-md"></canvas>  
    </div>
  );
}
