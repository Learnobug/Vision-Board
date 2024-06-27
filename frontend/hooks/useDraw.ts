"use client";
import { use, useEffect, useRef, useState } from "react";

export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void
) => {
  const [clicked, setClicked] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<Point | null>(null);
  


    const handleMouseDown = () => {
    setClicked(true);
    };
    const mouseupHandler=()=>{
      setClicked(false);
      prevPoint.current=null
    }

    const clearCanvas= ()=>{
      const canvas=canvasRef.current;
      if(!canvas) return;
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx ) return;
      ctx.clearRect(0,0,canvas.width,canvas.height)
    }

  

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if(!clicked) return;
      const currentPoint = computePointInCanvas(e);
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !currentPoint) return;
       
      onDraw({ctx,currentPoint,prevPoint:prevPoint.current})
      prevPoint.current=currentPoint;
    };

    const computePointInCanvas = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // console.log({ x: x, y: y });
      // console.log({ rectleft: rect.left, rectright: rect.right });
      return { x, y };
    };

    canvasRef.current?.addEventListener("mousemove", handler);
    window.addEventListener('mouseup',mouseupHandler)

    return () => canvasRef?.current?.removeEventListener("mousemove", handler);
  }, [onDraw]);

  return { canvasRef, handleMouseDown ,clearCanvas};
};
