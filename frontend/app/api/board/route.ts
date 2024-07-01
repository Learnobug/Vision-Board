import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();


export async function POST(req: any){
    try{
        const body = await req.json();
        const {userId} = body;
        console.log(userId);
        const boards = await prisma.board.findMany(
            {
                where:{
                    AdminId:parseInt(userId)
                },
                select:{
                    BoardId:true,
                    name:true,
                    AdminId:true
                }

            }
        );
        return NextResponse.json(boards);
    }catch(error){
        return NextResponse.json(
            {
                msg:`error occur ${error}`
            },
            {status:400}
        );
    }
}