import { Post } from "@prisma/client";
import NoPosts from "@/components/NoPosts";
import PostCard from "@/components/PostCard";

interface SearchParams {
  tag?: string;
}

async function getAllPosts(): Promise<Post[]> {
  return (
    await fetch("http://localhost:3000/api/posts", {
      cache: "no-cache",
    })
  ).json();
}

async function getPostsByTag(tag: string): Promise<Post[]> {
  return (
    await fetch(`http://localhost:3000/api/posts?tag=${tag}`, {
      cache: "no-cache",
    })
  ).json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const tag = searchParams.tag;
  let posts;

  if (!tag) {
    posts = await getAllPosts();
  } else {
    posts = await getPostsByTag(tag);
  }

  return (
    <main className={`masonry ${posts.length < 3 && "flex"}`}>
      {!!posts.length ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <NoPosts />
      )}
    </main>
  );
}
