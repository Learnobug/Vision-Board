"use client";
import { useEffect, useRef, useState,useCallback } from "react";

export const useDraw = (onDrawLine:any,onErase:any, onDrawRectangle:any, onDrawCircle:any, onDrawstline:any, drawMode:any) => {
  const [clicked, setClicked] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<Point | null>(null);
  const startPoint = useRef<any>(null);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);



  const handleMouseDown = (e: MouseEvent) => {
    setClicked(true);
    startPoint.current = computePointInCanvas(e);
  };

  //@ts-ignore
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
//@ts-ignore
  const handleMouseMove = useCallback((e: MouseEvent)=>{
    if (!clicked || (drawMode !== ("line") && drawMode !==("eraser"))) return;
    const currentPoint = computePointInCanvas(e);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !currentPoint) return;
     if(drawMode == "line"){
    onDrawLine({ ctx, currentPoint, prevPoint: prevPoint.current });
     }
     else
     {
      console.log("sq")
      onErase({ ctx, currentPoint, prevPoint: prevPoint.current });
     }
    prevPoint.current = currentPoint;
  });

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory(prevHistory => {
      const newHistory = [...prevHistory];
      newHistory.push(imageData);
      return newHistory;
    });
    setRedoStack([]); 

  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    saveCanvasState();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  const handleRedo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (history.length > 0) {
      const previousImageData = history[history.length - 1];
      setHistory(prevHistory => prevHistory.slice(0, -1));
      setRedoStack(prevRedoStack => [...prevRedoStack, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
      ctx.putImageData(previousImageData, 0, 0);
    }
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (redoStack.length > 0) {
      const nextImageData = redoStack[redoStack.length - 1];
      setRedoStack(prevRedoStack => prevRedoStack.slice(0, -1));
      setHistory(prevHistory => [...prevHistory, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
      ctx.putImageData(nextImageData, 0, 0);
    }
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

  return { canvasRef, handleMouseDown, handleMouseUp, handleMouseMove, clearCanvas,handleRedo };
};
