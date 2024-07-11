"use client";

import { Comments } from "@/types/store";
import { useAuthStore } from "@/zustand/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRef } from "react";
import GetComments from "./GetComments";

export default function Comment() {
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const params = useParams();

  const user = useAuthStore((state) => state.user);
  interface CommentsData {
    user_name: string;
    user_id: string;
    content: string;
    post_id: string;
  }

  const addStoreList = async (data: CommentsData) => {
    const response = await fetch("http://localhost:3000/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { mutate: addMutation } = useMutation<Comments, unknown, CommentsData>({
    mutationFn: (data: CommentsData) => addStoreList(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comment"] }),
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const CommentsData: CommentsData = {
      user_name: user?.user_metadata.display_name || "",
      user_id: user?.user_metadata.sub,
      content: contentRef.current?.value || "",
      post_id: params.id as string,
    };
    if (user === null) {
      alert("로그인 시 댓글 작성 가능합니다.");
    }

    addMutation(CommentsData);
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">댓글</h2>

        <form onSubmit={onSubmit} className="mb-4 flex">
          <textarea
            ref={contentRef}
            className="w-[90%] p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Write a comment..."
          ></textarea>
          <button className="w-[10%] bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
            작성
          </button>
        </form>
        <GetComments />
      </div>
    </div>
  );
}
