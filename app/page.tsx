async function getAllPosts() {
  const posts = await fetch("http://localhost:3000/api/posts");
  return posts.json();
}

export default async function Home() {
  const usersPosts = await getAllPosts();
  console.log(usersPosts);

  return <main>MAIN CONTENT</main>;
}
