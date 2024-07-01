import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: any) {
  try {
    const reqBody = await req.json();
    const { BoardState, userId, boardId } = reqBody;
    console.log(reqBody);
    const newBoard = await prisma.board.create({
      data: {
        AdminId: userId,
        state: BoardState,
        BoardId: boardId,
      },
    });
    return NextResponse.json(
      {
        msg: "board created Successfully",
        newBoard,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        msg: `error occur ${error}`,
      },
      { status: 400 }
    );
  }
}
export async function GET(req: any) {
  try {
    const BoardId = parseInt(req.url.split("/")[5]);
    const boardExist = await prisma.board.findFirst({
      where: {
        BoardId: BoardId,
      },
      select: {
        state: true,
      },
    });
    if (boardExist) {
      return NextResponse.json(
        {
          msg: "board found",
          boardExist,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          msg: "board not found",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        msg: `error occur ${error}`,
      },
      { status: 400 }
    );
  }
}
export async function PUT(req: any) {
  try {
    const reqbody = await req.json();
    const BoardId = parseInt(req.url.split("/")[5]);
    const { BoardState, userId } = reqbody;
    console.log("Currently here");
    const boardExist = await prisma.board.findFirst({
      where: {
        AdminId: parseInt(userId),
        BoardId: BoardId,
      },
    });
    console.log(BoardId, userId);
    console.log(boardExist);
    if (boardExist) {
      console.log("inside board exists");
      try{

        const updatedState = await prisma.board.update({
          // @ts-ignore
          where: {
            id: boardExist.id,
          },
          data: {
            state: BoardState,
          },
        });
        return NextResponse.json(
          {
            msg: "board updated Successfully",
            updatedState,
          },
          { status: 200 }
        );
      } catch (error) {
        return NextResponse.json(
          {
            msg: `error occur ${error}`,
          },
          { status: 400 }
        );
      }
    }else
    {
      return NextResponse.json(
        {
          msg: "board not found",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        msg: `error occur ${error}`,
      },
      { status: 400 }
    );
  }
}
