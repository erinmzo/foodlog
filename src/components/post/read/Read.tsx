"use client";

import { Post } from "@/types/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ReadButton from "./ReadButton";
import Description from "./ReadDescription";
import ReadHeader from "./ReadHeader";
import ReadImage from "./ReadImage";
import ReadInfo from "./ReadInfo";

export default function Read() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const getPostsData = async () => {
    const response = await fetch("http://localhost:3000/api/post");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Post[] = await response.json();
    return data.filter((post) => post.id === id);
  };

  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ["supabaseData", id],
    queryFn: getPostsData,
    enabled: !!id,
  });

  const deletePost = async (postId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/post?id=${postId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      queryClient.invalidateQueries({ queryKey: ["supabase", id] });
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  if (error) {
    console.error(error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pb-[100px] px-[15px] lg:px-0">
      <div className="mt-[80px] mb-[40px]">
        <ReadHeader />
      </div>
      <div className="border border-[#f5f5f5] bg-white rounded-lg w-full max-w-[1024px]">
        <div className="flex flex-col px-[15px] items-center lg:px-[140px] py-[72px]">
          {data?.map((posts) => (
            <>
              <div key={posts.id} className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-8">
                <ReadInfo label="방문/배달" value={posts.category} />
                <ReadInfo label="별점" value={posts.rating} />
                <ReadInfo label="식당 이름" value={posts.store_name} />
                <ReadInfo label="메뉴 이름" value={posts.menu_name} />
                <ReadInfo label="주문한 날짜" value={posts.order_date} />
                <ReadInfo label="작성자" value={posts.user_nickname} />
                <ReadInfo label="주소" value={posts.address || ""} />
              </div>
              <div className="mt-[50px]">
                <ReadImage imgUrl={posts.img_url} />
              </div>
              <Description posts={posts} />
              <ReadButton />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
