import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

interface CreatePostBody {
  userId: string;
  content: string;
  title: string;
  tags?: string[];
}

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  const body: CreatePostBody = await req.json();
  const { userId, title, content, tags } = body;
  const user = await prisma.user.findUnique({
    where: {
      email: session!.user.email as string,
    },
  });

  if (user?.id !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 400 });
  }
  const post = await prisma.post.create({
    data: {
      userId,
      title,
      content,
      tags,
    },
  });
  return NextResponse.json(post);
}
