
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma =new PrismaClient()


export async function PUT(req:any) {
    try{
        const reqbody = await req.json();
         const BoardId=parseInt(req.url.split('/')[5]);
         const {BoardState,userId}=reqbody;
         const boardexists=await prisma.board.findFirst({
            where:{
                AdminId:parseInt(userId),
                id:BoardId
            }
         })
          console.log(BoardId,userId)
          console.log(boardexists)
         if(boardexists)
            {
                const updatedstate=await prisma.board.update({
                    where:{
                        id:BoardId,
                        AdminId:parseInt(userId),
                    },
                    data:{
                        state:BoardState
                    }
                })
                return NextResponse.json({
                    msg:'board updated Successfully',
                    updatedstate
                },{status:200})
            }
            const newboard=await prisma.board.create({
                data:{
                    AdminId:userId,
                    state:BoardState
                }
            })
            return NextResponse.json({
                msg:'board created Successfully',
                newboard
            },{status:201})
    }
    catch(error){
      return NextResponse.json({
        msg:`error occur ${error}`
      },{status:400})
    }
}