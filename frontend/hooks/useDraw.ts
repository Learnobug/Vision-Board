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


  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const currentPoint = computePointInCanvas(e);
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !currentPoint) return;
    };

    const computePointInCanvas = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      console.log({ x: x, y: y });
      console.log({ rectleft: rect.left, rectright: rect.right });
      return { x, y };
    };

    canvasRef.current?.addEventListener("mousemove", handler);

    return () => canvasRef?.current?.removeEventListener("mousemove", handler);
  }, []);

  return { canvasRef, handleMouseDown };
};
