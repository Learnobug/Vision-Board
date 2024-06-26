"use client";
import { useDraw } from "@/hooks/useDraw";
import Image from "next/image";

export default function Home() {
  const { canvasRef, handleMouseDown } = useDraw(drawLine);

  const drawLine = ({ ctx, currentPoint, prevPoint }: Draw) => {
    const { x: currX, y: currY } = currentPoint;
    const color = "black";
    const width = 2;

    let startPoint = prevPoint || currentPoint;
    if (!ctx) return;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  };

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <canvas
        onMouseDown={handleMouseDown}
        ref={canvasRef}
        width={750}
        height={550}
        className="border border-black rounded-md"
      ></canvas>
    </div>
  );
}
