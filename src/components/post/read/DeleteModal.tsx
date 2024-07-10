import React from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onDelete,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <p>게시물을 삭제하시겠습니까?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>
            아니오
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onDelete}
          >
            예
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
