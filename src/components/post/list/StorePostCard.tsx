import { Post } from "@/types/type";
import Image from "next/image";

interface StorePostCardProps {
  post: Post;
}

function StorePostCard({ post }: StorePostCardProps) {
  return (
    <div className="flex flex-col rounded-[15px] overflow-hidden border border-[#f5f5f5] hover:shadow-lg">
      <div className="relative aspect-video">
        {post.img_url && (
          <Image
            src={post.img_url}
            alt={post.menu_name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={true}
            quality={75}
          />
        )}
      </div>
      <div className="p-[12px] bg-[#fdfdfd]">
        <div className="text-[13px] text-[#878787]">{post.order_date}</div>
        <h4 className="text-[18px] font-bold mt-2 truncate">{post.store_name}</h4>
        <div className="text-[#24CAFF] font-bold mt-2 truncate">{post.menu_name}</div>
        <div className="mt-2 truncate">{post.content}</div>
        <div className="flex justify-between mt-6 text-[13px] text-[#878787]">
          <div>by. {post.user_nickname}</div>
          <div>⭐️ {post.rating}/5</div>
        </div>
      </div>
    </div>
  );
}

export default StorePostCard;
