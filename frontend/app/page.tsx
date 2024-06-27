"use client";
import { useDraw } from "@/hooks/useDraw";
import Image from "next/image";
import { useState } from "react";
import {ChromePicker} from 'react-color'
export default function Home() {
const[color,setColor]=useState("#000")
  
  const drawLine = ({ ctx, currentPoint, prevPoint }: Draw) => {
    const { x: currX, y: currY } = currentPoint;
 
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

  const { canvasRef, handleMouseDown ,clearCanvas} = useDraw(drawLine);

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <ChromePicker color={color} onChange={(e:any)=>setColor(e.hex)}/>
        <button type="button" onClick={clearCanvas}>Clear Canvas</button>
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
