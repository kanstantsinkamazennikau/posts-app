import { Post } from "@prisma/client";
import Link from "next/link";

interface PostCardProps {
  post: Post;
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  const { title, content, tags } = post;
  return (
    <div className="border-gray-800 border-2 rounded-lg p-1 item">
      <div className="font-semibold capitalize text-lg text-center">
        {title + index}
      </div>
      <div className="max-h-60 overflow-hidden">{content}</div>
      {tags.map((tag) => (
        <Link
          href={{ pathname: "/posts", query: { tag } }}
          key={tag}
          className="mr-1 text-blue-500 cursor-pointer underline hover:text-blue-700"
        >
          {`#${tag}`}
        </Link>
      ))}
    </div>
  );
}
