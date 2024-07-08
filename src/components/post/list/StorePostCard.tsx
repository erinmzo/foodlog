import { Post } from "@/types/store";
import Image from "next/image";

interface StorePostCardProps {
  post: Post;
}

function StorePostCard({ post }: StorePostCardProps) {
  return (
    <div className="flex flex-col rounded-[15px] overflow-hidden border border-[#f5f5f5]">
      <div className="relative aspect-video">
        <Image src="/img/test-img.png" alt={post.menu_name} fill className="object-fill" />
      </div>
      <div className="p-[12px] bg-[#fdfdfd]">
        <div className="text-[13px] text-[#878787]">{post.order_date}</div>
        <h4 className="text-[18px] font-bold mt-2 truncate">{post.store_name}</h4>
        <div className="text-[#24CAFF] font-bold mt-2 truncate">{post.menu_name}</div>
        <div className="mt-2 truncate">{post.content}</div>
        <div className="flex justify-between mt-6 text-[13px] text-[#878787]">
          <div>by. {post.user_nickname}</div>
          <div>{post.rating}/5</div>
        </div>
      </div>
    </div>
  );
}

export default StorePostCard;
