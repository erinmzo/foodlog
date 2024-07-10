"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import ReadHeader from "./ReadHeader";
import ReadInfo from "./ReadInfo";
import ReadImage from "./ReadImage";
import Description from "./ReadDescription";
import ReadButton from "./ReadButton";
import { Post } from "@/types/store";

export default function Read() {
  const { id } = useParams();
  console.log("id =>", id);
  const getPostsData = async () => {
    const response = await fetch("http://localhost:3000/api/store");
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

  console.log("data", data);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error(error);

    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <ReadHeader />
        <div className="grid grid-cols-1 gap-4 justify-items-center">
          {data?.map((posts) => (
            <div key={posts.id} className="border-b border-gray-200 py-2 my-2">
              <div className="flex space-x-4 whitespace-nowrap">
                <div className="w-1/2">
                  <ReadInfo label="방문/배달" value={posts.category} />
                </div>
              </div>
              <div className="flex mt-5 space-x-4 items-center">
                <div className="w-1/2 whitespace-nowrap">
                  <ReadInfo label="식당 이름" value={posts.store_name} />
                </div>
                <div className="w-1/2 whitespace-nowrap">
                  <ReadInfo label="메뉴 이름" value={posts.menu_name} />
                </div>
              </div>
              <div className="flex mt-5 space-x-4 items-center">
                <div className="w-1/2 whitespace-nowrap">
                  <ReadInfo label="주문한 날짜" value={posts.order_date} />
                </div>
                <div className="w-1/2 whitespace-nowrap">
                  <ReadInfo label="작성자" value={posts.user_nickname} />
                </div>
              </div>
              <div className="flex mt-5 space-x-4 items-center">
                <div className="w-1/2 whitespace-nowrap">
                  <ReadInfo label="주소" value={posts.address ?? ""} />
                </div>
                <div className="w-1/2 whitespace-nowrap">
                  <ReadInfo label="별점" value={posts.rating} />
                </div>
              </div>
              <ReadImage />
              <Description posts={posts} />
            </div>
          ))}
        </div>

        <ReadButton />
      </div>
    </div>
  );
}
