import { Post } from "@/types/store";

async function StorePostList() {
  const response = await fetch("http://localhost:3000/api/store");
  const posts: Post[] = await response.json();

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.store_name}</div>
      ))}
    </div>
  );
}

export default StorePostList;
