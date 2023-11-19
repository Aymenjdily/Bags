import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  if (!params.token) {
    return NextResponse.json({ error: "No Token" }, { status: 401 });
  }

  if (params.token) {
    try {
      const decoded = jwt.verify(params.token, `${process.env.JWT_SECRET}`) as {
        userId: string;
      };
      const existsUser = await prisma.user.findUnique({
        where: {
          id: decoded.userId,
        },
      });

      if (!existsUser) {
        return NextResponse.json(
          { error: "Account not found !" },
          { status: 400 }
        );
      }
      return NextResponse.json(existsUser, { status: 201 });
    } catch (error) {
      return NextResponse.json("Unauthorized", { status: 400 });
    }
  }
}
