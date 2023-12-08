import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const res = NextResponse.json({
            message: "Logout successful",
            success: true
        }, { status: 201 });
  
        res.cookies.set("token", "", {
            httpOnly: true,
            maxAge: 0, // Set maxAge to 0 to expire the cookie immediately
            path: "/", // Set the path to ensure the cookie is removed from all paths
        });
  
        return res;
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        });
    }
  }