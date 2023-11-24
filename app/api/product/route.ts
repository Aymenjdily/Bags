import { CreateProductSchema } from "@/app/Validations";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const body = await request.json()
    const validation = CreateProductSchema.safeParse(body)

    if(!validation.success){
        return NextResponse.json(validation.error.format(), { status:401 })
    }

    const { name, subTitle, description, price, rate, image, category } = body

    const newProduct = await prisma.product.create({
        data: {
            name: name,
            subTitle: subTitle,
            description: description,
            price: price,
            rate: rate,
            photo: image,
            category: category
        }
    })

    return NextResponse.json(newProduct, { status:201 })
}