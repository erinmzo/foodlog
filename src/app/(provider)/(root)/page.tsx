import StorePostList from "@/components/post/list/StorePostList";

export default function MainPage() {
  return (
    <div className="container mx-auto max-w-[1024px] py-[50px]">
      <div className="flex flex-col items-center pt-12 mb-8 border-t border-[#f5f5f5]">
        <h3 className="text-2xl font-bold">오늘의 푸드 로그</h3>
        <p className="text-[16px] text-[#878787] mt-2">방문한 식당과 메뉴에 대해 기록하고 공유해보세요!</p>
      </div>
      <StorePostList />
    </div>
  );
}
