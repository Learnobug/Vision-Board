"use client";
import { useDraw } from "@/hooks/useDraw";
import Image from "next/image";
import { useState, useRef } from "react";
import { ChromePicker } from 'react-color';

export default function Home() {
  const [color, setColor] = useState("#000");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [inputPosition, setInputPosition] = useState({ x: 0, y: 0 });
  const [drawMode, setDrawMode] = useState("line");

  const drawLine = ({ ctx, currentPoint, prevPoint }: Draw) => {
    const { x: currX, y: currY } = currentPoint;
    const width = 5;
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

  const drawRectangle = ({ ctx, startPoint, endPoint }: DrawShape) => {
    if (!ctx || !startPoint || !endPoint) return;
    const { x: startX, y: startY } = startPoint;
    const { x: endX, y: endY } = endPoint;

    const width = endX - startX;
    const height = endY - startY;
    ctx.beginPath();   
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.rect(startX, startY, width, height);
    ctx.stroke();
  };

  const drawCircle = ({ ctx, startPoint, endPoint }: DrawShape) => {
    if (!ctx || !startPoint || !endPoint) return;
    const { x: startX, y: startY } = startPoint;
    const { x: endX, y: endY } = endPoint;

    const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    ctx.stroke();
  };

  const textOnCanvas = (e:any) => {
    const canvas = canvasRef.current;

    if (!canvas) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    setInputPosition({ x: e.clientX, y: e.clientY });

    setShowInput(true);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 0);
  };

  const textAfterCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas?.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    if (!ctx) return;
    ctx.font = "16px Arial";
    ctx.fillStyle = color;
    ctx.fillText(inputValue, inputPosition.x - rect.left, inputPosition.y - rect.top);
    setInputValue("");
    setShowInput(false);
  };

  const { canvasRef, handleMouseDown, handleMouseUp, handleMouseMove, clearCanvas } = useDraw(drawLine, drawRectangle, drawCircle, drawMode);

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <ChromePicker color={color} onChange={(e:any) => setColor(e.hex)} />
      <select value={drawMode} onChange={(e) => setDrawMode(e.target.value)}>
        <option value="line">Draw Line</option>
        <option value="rectangle">Draw Rectangle</option>
        <option value="circle">Draw Circle</option>
      </select>
      <canvas
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        ref={canvasRef}
        width={750}
        height={550}
        onDoubleClick={(e) => textOnCanvas(e)}
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
            top: inputPosition.y - 9,
            border: "1px solid black",
            zIndex: 1,
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") textAfterCanvas(e);
          }}
        />
      )}
    </div>
  );
}
