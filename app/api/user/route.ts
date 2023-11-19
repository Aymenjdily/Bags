import { CreateNewUserSchema } from "@/app/Validations";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = CreateNewUserSchema.safeParse(body);
  const { name, email, password } = body

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 401,
    });
  }

  const existsUser = await prisma.user.findUnique({
    where: {
        email: email
    }
  })

  if(existsUser){
    return NextResponse.json({ error: "Account is already exists try to login" }, { status:401 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await prisma.user.create({
    data: {
        name: name,
        email: email,
        password: hashedPassword
    }
  })

  return NextResponse.json(newUser, { status:201 })
}
