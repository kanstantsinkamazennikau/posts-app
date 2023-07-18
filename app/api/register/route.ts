import { prisma } from "@/lib/prisma";
import { hashPass } from "@/utils/hashPassword";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, name } = body;
  try {
    const hashedPassword = await hashPass(password);
    const isUserAlreadyExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (isUserAlreadyExists) {
      return NextResponse.json(
        { error: "User with such email already exists" },
        { status: 400 },
      );
    }

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        name,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
}
