import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma"; 

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not set in the environment variables");
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, secret) as { userId: string }; 
    } catch (err) {
      console.error('JWT verification error:', err); 
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 } 
      );
    }

    console.log(decodedToken);

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching user list:", error.message);
      return NextResponse.json(
        { message: "Internal Server Error", error: error.message },
        { status: 500 }
      );
    }
  }
}
