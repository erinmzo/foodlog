"use client";

import { Comments } from "@/types/store";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";

export default function Comment() {
  const user_nameRef = useRef<HTMLSelectElement>(null);
  const user_idRef = useRef<HTMLSelectElement>(null);
  const contentRef = useRef<HTMLSelectElement>(null);

  interface CommentsData {
    user_name: string;
    user_id: string;
    content: string;
  }

  const addStoreList = async (data: CommentsData): Promise<Comments> => {
    const response = await fetch("http://localhost:3000/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  const { mutate: addMutation } = useMutation<Comments, unknown, CommentsData>({
    mutationFn: (data: CommentsData) => addStoreList(data),
  });

  const onSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    const CommentsData: CommentsData = {
      user_name: user_nameRef.current?.value || "",
      user_id: user_idRef.current?.value || "",
      content: contentRef.current?.value || "",
    };

    addMutation(CommentsData);
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">댓글</h2>

        <form onSubmit={onSubmit} className="mb-4">
          <input
            className="w-[90%] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Write a comment..."
          ></input>
          <button className="w-[10%]  bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            작성
          </button>
        </form>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-md shadow">
            <div className="flex justify-between items-center mb-2  ">
              <div>
                <span className="font-semibold  ">동규 </span>
                <span className="text-gray-600 text-sm  ">2시간 전</span>
                <span className="mt-3 order-last">
                  <button className="text-blue-500 hover:underline">
                    수정
                  </button>
                  <button className="text-red-500 hover:underline ml-4">
                    삭제
                  </button>
                </span>
              </div>
            </div>
            <p className="text-gray-800">댓글 예시</p>
          </div>
        </div>
      </div>
    </div>
  );
}
