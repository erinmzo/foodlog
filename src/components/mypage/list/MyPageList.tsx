"use client";
import StorePostCard from "@/components/post/list/StorePostCard";
import { createClient } from "@/supabase/client";
import { Post } from "@/types/store";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

function MyPageList() {
  const params = useParams();
  const id = params.id;
  const getProfileData = async () => {
    const supabase = createClient();
    const data = await supabase.from("profile").select("*").eq("id", id).maybeSingle();
    return data;
  };

  const { data: profile } = useQuery({
    queryKey: ["profile", id],
    queryFn: getProfileData,
  });

  const getStoreData = async () => {
    const response = await fetch("http://localhost:3000/api/post");
    const data = await response.json();
    return data;
  };

  const { data: posts, isPending, error } = useQuery<Post[]>({ queryKey: ["posts", id], queryFn: getStoreData });

  if (isPending) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  if (error) {
    alert("데이터를 가져오는데 실패했습니다");
    return null;
  }

  const filteredPost = posts.filter((post) => {
    return post.user_id === profile?.data?.id;
  });

  return (
    <div className="container mx-auto max-w-[1024px] border-t border-[#f5f5f5] pt-[70px] mt-[70px] px-[15px] lg:px-0">
      <h1 className="text-center text-[24px] font-bold">나의 푸드로그</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[17px] mt-16">
        {filteredPost && filteredPost.length ? (
          filteredPost.map((post) => (
            <Link key={post.id} href={`/post/read/${post.id}`}>
              <StorePostCard post={post} />
            </Link>
          ))
        ) : (
          <>
            <div className="h-screen flex items-center justify-center text-center text-2xl">
              작성된 게시물이 없습니다
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MyPageList;
