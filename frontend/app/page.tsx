"use client";
import { useDraw } from "@/hooks/useDraw";
import Image from "next/image";
import { useState, useRef } from "react";
import { ChromePicker } from "react-color";

export default function Home() {
  const [color, setColor] = useState("#000");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [inputPosition, setInputPosition] = useState({ x: 0, y: 0 });
  const [drawMode, setDrawMode] = useState("line");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const buttonRef = useRef(null);
  const [textButton, setTextButton] = useState(false);

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

    const radius = Math.sqrt(
      Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
    );

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    ctx.stroke();
  };

  const textOnCanvas = (e: any) => {
    if (!textButton) return;
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
    ctx.fillText(
      inputValue,
      inputPosition.x - rect.left,
      inputPosition.y - rect.top
    );
    setInputValue("");
    setShowInput(false);
    setTextButton(false);
  };

  const {
    canvasRef,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    clearCanvas,
  } = useDraw(drawLine, drawRectangle, drawCircle, drawMode);

  return (
    <div className="w-screen h-screen bg-white flex justify-between items-center">
      <div className="flex justify-start w-1/4">
        <div className="flex flex-col space-y-4 p-4 bg-gray-200 border-r border-gray-300 relative rounded-lg">
          <button
            ref={buttonRef}
            onClick={() => setShowColorPicker((show) => !show)}
            className="py-2 px-4 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="color-palette"
              className="size-6"
              fill={color}
            >
              <g>
                <g>
                  <path d="M19.54 5.08A10.61 10.61 0 0 0 11.91 2a10 10 0 0 0-.05 20 2.58 2.58 0 0 0 2.53-1.89 2.52 2.52 0 0 0-.57-2.28.5.5 0 0 1 .37-.83h1.65A6.15 6.15 0 0 0 22 11.33a8.48 8.48 0 0 0-2.46-6.25zM15.88 15h-1.65a2.49 2.49 0 0 0-1.87 4.15.49.49 0 0 1 .12.49c-.05.21-.28.34-.59.36a8 8 0 0 1-7.82-9.11A8.1 8.1 0 0 1 11.92 4H12a8.47 8.47 0 0 1 6.1 2.48 6.5 6.5 0 0 1 1.9 4.77A4.17 4.17 0 0 1 15.88 15z"></path>
                  <circle cx="12" cy="6.5" r="1.5"></circle>
                  <path d="M15.25 7.2a1.5 1.5 0 1 0 2.05.55 1.5 1.5 0 0 0-2.05-.55zm-6.5 0a1.5 1.5 0 1 0 .55 2.05 1.5 1.5 0 0 0-.55-2.05zm-2.59 4.06a1.5 1.5 0 1 0 2.08.4 1.49 1.49 0 0 0-2.08-.4z"></path>
                </g>
              </g>
            </svg>
          </button>
          {showColorPicker && (
            <div
              className="absolute left-full top-0 ml-2"
              style={{ zIndex: 1000 }}
            >
              <ChromePicker
                color={color}
                onChangeComplete={(color) => setColor(color.hex)}
              />
            </div>
          )}
          <button
            onClick={() => setTextButton(!textButton)}
            className={`py-2 px-4 ${textButton ? 'bg-blue-500 text-white' : 'bg-white'} text-gray-700 font-semibold rounded-lg shadow-md`}
          >
            A
          </button>
          <button
            onClick={() => setDrawMode("line")}
            className={`py-2 px-4 text-gray-700 font-semibold rounded-lg shadow-md ${
              drawMode === "line" ? "bg-red-500 text-white" : "bg-white"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
          <button
            onClick={() => setDrawMode("rectangle")}
            className={`py-2 px-4 text-gray-700 font-semibold rounded-lg shadow-md ${
              drawMode === "rectangle" ? "bg-red-500 text-white" : "bg-white"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
              />
            </svg>
          </button>
          <button
            onClick={() => setDrawMode("circle")}
            className={`py-2 px-4 text-gray-700 font-semibold rounded-lg shadow-md ${
              drawMode === "circle" ? "bg-red-500 text-white" : "bg-white"
            }`}
          >
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11z" />
            </svg>
          </button>
          <button
            onClick={clearCanvas}
            className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="w-3/4">
        <canvas
          //@ts-ignore
          onMouseDown={handleMouseDown}
          //@ts-ignore
          onMouseUp={handleMouseUp}
          //@ts-ignore
          onMouseMove={handleMouseMove}
          ref={canvasRef}
          width={750}
          height={550}
          onClick={(e) => textOnCanvas(e)}
          className="border border-black rounded-md"
        ></canvas>
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
              //@ts-ignore
              if (e.key === "Enter") textAfterCanvas(e);
            }}
          />
        )}
      </div>
    </div>
  );
}
