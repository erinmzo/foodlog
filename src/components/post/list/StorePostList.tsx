"use client";
import { Post } from "@/types/store";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Report } from "notiflix";
import StorePostCard from "./StorePostCard";

function StorePostList() {
  const getStoreData = async () => {
    const response = await fetch("/api/post", { next: { revalidate: 60 } });
    const data = await response.json();
    return data;
  };

  const { data: posts, isPending, error } = useQuery<Post[]>({ queryKey: ["posts"], queryFn: getStoreData });
  if (isPending) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }
  if (error) {
    Report.failure("데이터를 가져오는데 실패했습니다", "", "확인");
    return null;
  }

  return (
    <div className="container mx-auto max-w-[1024px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[17px] px-5 lg:px-0">
        {posts.map((post) => (
          <Link key={post.id} href={`/post/read/${post.id}`}>
            <StorePostCard post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default StorePostList;
