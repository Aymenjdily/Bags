import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params } : { params: { id: string }}){
    const body = await request.json()
    const existsOrder = await prisma.order.findUnique({
        where: {
            id: params.id
        }
    })

    if(!existsOrder){
        return NextResponse.json({ error: "Order not found!" }, { status:401 })
    }

    const { state } = body

    const updateState = await prisma.order.update({
        where:{
            id: existsOrder.id
        },
        data: {
            state: state
        },
        include: {
            products: true
        }
    })

    return NextResponse.json(updateState, { status:201 })
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string }}){
    const existsOrder = await prisma.order.findUnique({
        where: {
            id: params.id
        }
    })

    if(!existsOrder){
        return NextResponse.json({ error: "Order not found!"}, { status:401 })
    }

    const deletedOrder = await prisma.order.delete({
        where: {
            id: existsOrder.id
        }
    })

    return NextResponse.json(deletedOrder, { status:201 })
}