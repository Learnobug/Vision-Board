type Draw = {
    ctx: CanvasRenderingContext2D;
    currentPoint: Point;
    prevPoint: Point | null;
    };

    type Point = { x: number; y: number}

    type  DrawShape=
        { ctx:CanvasRenderingContext2D; startPoint: Point; endPoint:Point }
    