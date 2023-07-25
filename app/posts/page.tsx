import { Post } from "@prisma/client";
import NoPosts from "@/components/NoPosts";
import PostCard from "@/components/PostCard";
import { useSearchParams } from "next/navigation";
interface SearchParams {
  tag: string;
}

async function getPostsByTag(tag: string): Promise<Post[]> {
  return (
    await fetch(`http://localhost:3000/api/posts?tag=${tag}`, {
      cache: "no-cache",
    })
  ).json();
}

export default async function PostsByTag({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const usersPosts = await getPostsByTag(searchParams.tag);

  return (
    <main className="masonry-3">
      {!!usersPosts.length ? (
        usersPosts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))
      ) : (
        <NoPosts />
      )}
    </main>
  );
}
