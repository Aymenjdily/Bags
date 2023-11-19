import { CreateNewUserSchema } from "@/app/Validations";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = CreateNewUserSchema.safeParse(body);
  const { email, password } = body;

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 401 });
  }

  const existsUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!existsUser) {
    return NextResponse.json(
      { error: "Account is not found !" },
      { status: 401 }
    );
  }

  if (!existsUser || !bcrypt.compareSync(password, existsUser.password!)) {
    return NextResponse.json(
      { error: "Invalid Email or Password" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { userId: existsUser.id },
    `${process.env.JWT_SECRET}`
  );

  const cookieOptions: any = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // Token will expire in 1 day
    sameSite: "strict", // 'strict', 'lax', or 'none' based on your requirements
    path: "/", // Set the cookie path to root (/) to make it accessible from all paths
  };

  const cookie = serialize("token", token, cookieOptions);

  return NextResponse.json(token, { status: 201, headers: { 'Set-Cookie': cookie } });
}
