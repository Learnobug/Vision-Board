"use client";
import { useEffect, useRef, useState,useCallback } from "react";

export const useDraw = (onDrawLine:any, onDrawRectangle:any, onDrawCircle:any, onDrawstline:any, drawMode:any) => {
  const [clicked, setClicked] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<Point | null>(null);
  const startPoint = useRef<Point | null>(null);

  const handleMouseDown = (e: MouseEvent) => {
    setClicked(true);
    startPoint.current = computePointInCanvas(e);
  };

  const handleMouseUp = useCallback((e: MouseEvent) => {
    setClicked(false);
    if (drawMode === "rectangle" && startPoint.current) {
      const endPoint = computePointInCanvas(e);
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx && endPoint) {
        onDrawRectangle({ ctx, startPoint: startPoint.current, endPoint });
      }
    } else if (drawMode === "circle" && startPoint.current) {
      const endPoint = computePointInCanvas(e);
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx && endPoint) {
        onDrawCircle({ ctx, startPoint: startPoint.current, endPoint });
      }
      
    }
    else if(drawMode === "stline" && startPoint.current)
      {
        const endPoint = computePointInCanvas(e);
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx && endPoint) {
        onDrawstline({ ctx, startPoint: startPoint.current, endPoint });
      }
      }
    prevPoint.current = null;
    startPoint.current = null;
  });

  const handleMouseMove = useCallback((e: MouseEvent)=>{
    if (!clicked || drawMode !== "line") return;
    const currentPoint = computePointInCanvas(e);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !currentPoint) return;

    onDrawLine({ ctx, currentPoint, prevPoint: prevPoint.current });
    prevPoint.current = currentPoint;
  });

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const computePointInCanvas = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
  };

  useEffect(() => {
    canvasRef.current?.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvasRef.current?.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return { canvasRef, handleMouseDown, handleMouseUp, handleMouseMove, clearCanvas };
};
