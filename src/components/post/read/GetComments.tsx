"use client";

import { Comments } from "@/types/store";
import { useAuthStore } from "@/zustand/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

interface CommentsData {
  nickname: string;
  user_id: string;
  content: string;
  post_id: string;
}

export default function GetComments() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const params = useParams();
  const paramsId = params.id as string;
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");

  const getComments = async (paramsId: string): Promise<Comments[]> => {
    try {
      const response = await fetch(`/api/comments/${paramsId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Comments[] = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const updateComment = async ({ id, content }: { id: string; content: string }): Promise<CommentsData> => {
    const response = await fetch("/api/comments", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, id }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update comment: ${response.statusText}`);
    }
    return response.json();
  };

  const deleteComment = async (id: string) => {
    const response = await fetch("http://localhost:3000/api/comments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  };

  const { data, isLoading, isError } = useQuery<Comments[]>({
    queryKey: ["comment", paramsId],
    queryFn: () => getComments(paramsId),
    enabled: !!paramsId,
  });

  const { mutate: updateMutation } = useMutation<CommentsData, Error, { id: string; content: string }>({
    mutationFn: (editData) => updateComment(editData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comment", paramsId] }),
  });

  const { mutate: deleteMutation } = useMutation<CommentsData, Error, string>({
    mutationFn: (id) => deleteComment(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comment", paramsId] }),
  });

  const handleEditClick = (comment: Comments) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleSaveClick = (id: string) => {
    updateMutation({ id, content: editContent });
    setEditingCommentId(null);
  };

  const handleDelete = async (id: string) => {
    alert("정말 삭제하시겠습니까?");
    try {
      deleteMutation(id);
    } catch (error) {
      console.error("Failed to delete the post:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading comments</div>;
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 rounded-md shadow">
        <div className="flex flex-col justify-between">
          {data?.map((comment) => (
            <div key={comment.id}>
              {editingCommentId === comment.id ? (
                <div>
                  <textarea
                    className="w-full p-2 border rounded"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <button
                    onClick={() => handleSaveClick(comment.id)}
                    className="text-blue-400 hover:underline font-semibold"
                  >
                    저장
                  </button>
                  <button
                    onClick={() => setEditingCommentId(null)}
                    className="text-gray-400 hover:underline font-semibold"
                  >
                    취소
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between">
                    <div>
                      <span className="font-semibold ">{comment.nickname}</span>
                      <span className="text-gray-600 text-sm ml-4">{comment.created_at.slice(0, 10)}</span>
                    </div>
                    {user && user.id === comment.user_id && (
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleEditClick(comment)}
                          className="text-blue-400 hover:underline font-semibold"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="text-red-400 hover:underline font-semibold "
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-800 mt-2 mb-4">{comment.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
