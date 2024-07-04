type DrawLineProps = Draw & {
    color: string
  }
  
  export const drawLine = ({ prevPoint, currentPoint, ctx, color }: DrawLineProps) => {
    const { x: currX, y: currY } = currentPoint
    const lineColor = color
    const lineWidth = 5
  
    let startPoint = prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(currX, currY)
    ctx.stroke()
  
    ctx.fillStyle = lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
    ctx.fill()
  }

   
  export const eraseLine = ({ prevPoint, currentPoint, ctx }: DrawLineProps) => {
    const { x: currX, y: currY } = currentPoint;
    const width = 20;
    let startPoint = prevPoint || currentPoint;
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, width / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.globalCompositeOperation = "source-over";
   
  }

  export const drawRectangle = ({  ctx, startPoint, endPoint,color }: any) => {
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
    ctx.save();
  }

  export const drawCircle = ({ ctx, startPoint, endPoint,color }: any) => {
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
    ctx.save();
  
  };
  export const drawStraightLine = ({ ctx, startPoint, endPoint,color }: any) => {
    if (!ctx || !startPoint || !endPoint) return;
    const { x: startX, y: startY } = startPoint;
    const { x: endX, y: endY } = endPoint;

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.save();

  };

 export const textOnCanvasfunc = ({e,canvasRef,setInputPosition, setShowInput,inputRef}: any) => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    setInputPosition({ x: e.clientX, y: e.clientY });

    setShowInput(true);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 0);
  };

 export const textAfterCanvasfunc = ({e,canvasRef,color,inputValue,inputPosition}: any) => {
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
    ctx.save();
  };