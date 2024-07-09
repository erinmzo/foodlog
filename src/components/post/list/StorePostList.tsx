"use client";
import { Post } from "@/types/store";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import StorePostCard from "./StorePostCard";

function StorePostList() {
  const getStoreData = async () => {
    const response = await fetch("http://localhost:3000/api/store", {
      next: { revalidate: 60 },
    });
    const data = await response.json();
    return data;
  };

  const { data: posts, isPending, error } = useQuery<Post[]>({ queryKey: ["store"], queryFn: getStoreData });
  if (isPending) return <div>Loading...</div>;
  if (error) {
    alert("데이터를 가져오는데 실패했습니다");
    return null;
  }

  return (
    <div className="container mx-auto max-w-[1024px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[17px]">
        {posts.map((post) => (
          <Link key={post.id} href={`post/read/${post.id}`}>
            <StorePostCard post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default StorePostList;
