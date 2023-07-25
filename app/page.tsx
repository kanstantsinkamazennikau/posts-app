import { Post } from "@prisma/client";
import NoPosts from "@/components/NoPosts";
import PostCard from "@/components/PostCard";

async function getAllPosts(): Promise<Post[]> {
  return (
    await fetch("http://localhost:3000/api/posts", {
      cache: "no-cache",
    })
  ).json();
}

export default async function Home() {
  const usersPosts = await getAllPosts();

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
