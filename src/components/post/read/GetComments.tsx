"use client";

import { Comments } from "@/types/store";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function GetComments() {
  const params = useParams();
  const paramsId = params.id as string;

  const getComments = async (paramsId: string) => {
    try {
      // URL에 쿼리 파라미터로 ID 전달
      const response = await fetch(
        `http://localhost:3000/api/comments/${paramsId}`,
        {
          method: "GET",
        }
      );
      console.log("Fetch response:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Comments[] = await response.json();
      console.log("Fetch data:", data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const { data, isLoading, isError } = useQuery<Comments[]>({
    queryKey: ["comment", params.id],
    queryFn: () => getComments(paramsId),
    enabled: !!params.id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading comments</div>;
  }

  console.log("comments", data);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 rounded-md shadow">
        <div className="flex flex-col justify-between items-center mb-2">
          {data?.map((comment) => (
            <div key={comment.id}>
              <span className="font-semibold">{comment.user_name} </span>
              <span className="text-gray-600 text-sm">
                {comment.created_at}
              </span>
              <span className="mt-3 order-last">
                <button className="text-blue-500 hover:underline">수정</button>
                <button className="text-red-500 hover:underline ml-4">
                  삭제
                </button>
              </span>
              <p className="text-gray-800">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
