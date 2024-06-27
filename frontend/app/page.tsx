"use client";
import { useDraw } from "@/hooks/useDraw";
import Image from "next/image";
import { useState,useRef } from "react";
import {ChromePicker} from 'react-color'
export default function Home() {
const[color,setColor]=useState("#000")
const [showInput, setShowInput] = useState(false);
const inputRef = useRef<HTMLInputElement>(null);
const [inputValue, setInputValue] = useState("");
const [inputPosition, setInputPosition] = useState({ x: 0, y: 0 });

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
  const textOnCanvas = (e) =>{
    const canvas = canvasRef.current;
    
    if (!canvas) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx ) return;
    setInputPosition({ x: e.clientX, y: e.clientY})

    setShowInput(true);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 0);
  } 
  const  textafterCanvas=(e: React.MouseEvent<HTMLCanvasElement>)=>{
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas?.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    if (!ctx) return;
    ctx.font = "16px Arial";
    ctx.fillStyle = color;
    ctx.fillText(inputValue,inputPosition.x-rect.left, inputPosition.y-rect.top);
    setInputValue("");
    setShowInput(false);
  }
 

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
        onDoubleClick={(e)=> textOnCanvas(e)}
        className="border border-black rounded-md"
      >
        
      </canvas>
      {showInput && (  
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={textOnCanvas}
          style={{
            position: "absolute",
            left: inputPosition.x,
            top: inputPosition.y-9,
            border: "1px solid black",
            zIndex: 1,
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") textafterCanvas(e);
          }}
         
          />
           )
        }
      
       
    </div>
  );
}
