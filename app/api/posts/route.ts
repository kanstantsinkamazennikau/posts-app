import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParamsTag = request.nextUrl.searchParams.get("tag");
  let posts;

  if (!searchParamsTag) {
    posts = await prisma.post.findMany();
  } else {
    posts = await prisma.post.findMany({
      where: {
        tags: {
          has: request.nextUrl.searchParams.get("tag"),
        },
      },
    });
  }

  return NextResponse.json(posts);
}
