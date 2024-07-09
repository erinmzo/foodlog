import { Post } from "@/types/store";
import StorePostCard from "./StorePostCard";

async function StorePostList() {
  // const response = await fetch("http://localhost:3000/api/post", {
  //   next: { revalidate: 60 },
  // });
  // const posts: Post[] = await response.json();

  return (
    <div className="container mx-auto max-w-[1024px]">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[17px]">
        {posts.map((post) => (
          <StorePostCard key={post.id} post={post} />
        ))}
      </div> */}
    </div>
  );
}

export default StorePostList;
