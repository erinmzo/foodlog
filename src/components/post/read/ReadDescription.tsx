import { Post } from "@/types/store";
import React from "react";
import ReadInfo from "./ReadInfo";

interface DescriptionProps {
  posts: Post;
}

const Description: React.FC<DescriptionProps> = ({ posts }) => {
  return <ReadInfo label="리뷰" value={posts.content} />;
};

export default Description;
