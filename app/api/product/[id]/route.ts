import { CreateProductSchema } from "@/app/Validations";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params } : { params: { id: string }}){
    const body = await request.json()
    const validation = CreateProductSchema.safeParse(body)

    if(!validation.success){
        return NextResponse.json(validation.error.format(), { status:401 })
    }

    const existsProduct = await prisma.product.findUnique({
        where: {
            id: params.id
        }
    })

    if(!existsProduct){
        return NextResponse.json({ error:"This Product doesn't exists" }, { status:401 })
    }

    const { image, name, subTitle, description, price, category } = body

    const updatedProduct = await prisma.product.update({
        where: {
            id: existsProduct.id
        },
        data: {
            name: name,
            photo: image,
            subTitle: subTitle,
            description: description,
            price: price,
            category: category
        }
    })

    return NextResponse.json(updatedProduct, { status:201 })
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string }}){
    const existsProduct = await prisma.product.findUnique({
        where: {
            id: params.id
        }
    })

    if(!existsProduct){
        return NextResponse.json({ error: "Product not found" }, { status: 401 })
    }

    const deletedProduct = await prisma.product.delete({
        where: {
            id: existsProduct.id
        }
    })

    return NextResponse.json(deletedProduct, { status:201 })
}