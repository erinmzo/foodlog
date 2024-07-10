import { Post } from "@/types/store";
import ReadInfo from "./ReadInfo";

interface DescriptionProps {
  posts: Post;
}

const Description = ({ posts }: DescriptionProps) => {
  return (
    <div className="w-full grid grid-cols-1 mt-[50px]">
      <ReadInfo label="리뷰" value={posts.content} />
    </div>
  );
};

export default Description;
