import { CreateOrderSchema } from "@/app/Validations";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const body = await request.json()
    const validation = CreateOrderSchema.safeParse(body)

    if(!validation.success){
        return NextResponse.json(validation.error.format(), { status:401 })
    }

    const { productsId, total, firstName, secondName, email, phone, city, address } = body

    const newOrder = await prisma.order.create({
        data: {
            productsId: productsId,
            total: total,
            firstName: firstName,
            secondName: secondName,
            email: email,
            phone: phone,
            city: city,
            address: address
        }
    })

    return NextResponse.json(newOrder, { status:201 })
}