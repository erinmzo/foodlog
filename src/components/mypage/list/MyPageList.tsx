// import { Post } from "@/types/store";

async function MyPageList() {
  //   const response = await fetch("http://localhost:3000/api/store");
  //   const posts: Post[] = await response.json();

  return (
    <div className="border-2 border-black flex flex-col my-auto items-center mx-3 mt-24 ">
      <div className="text-2xl font-bold">나의 푸드로그</div>
      {/* {posts.map((post) => (
		  <div key={post.id}>{post.store_name}</div>
		))} */}
    </div>
  );
}
export default MyPageList;
