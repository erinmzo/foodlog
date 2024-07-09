import StorePostCard from "@/components/post/list/StorePostCard";
import { Post } from "@/types/store";

async function MyPageList() {
  // const response = await fetch("http://localhost:3000/api/post", {
  //   next: { revalidate: 60 },
  // });
  // const posts: Post[] = await response.json();

  return (
    <div className="container mx-auto max-w-[1024px] mt-28">
      <div className="text-center font-bold text-2xl">나의 푸드로그</div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[17px] mt-14">
        {posts
           .filter((post) => {
               return post.user_id === user.id; 유저 정보 가져올 것
             })

          .map((post) => (
            <StorePostCard key={post.id} post={post} />
          ))}
      </div> */}
    </div>
  );
}
export default MyPageList;
