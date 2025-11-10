import { useState } from "react";
import type { CommentType } from "../types";

interface Props {
  comment: CommentType;
  onSubmitComment: (commentId: number, content: string) => void;
  onEditComment: (commentId: number, content: string) => void;
  onDeleteComment: (commentId: number) => void;
}

function Comment({
  comment,
  onSubmitComment,
  onEditComment,
  onDeleteComment,
}: Props) {
  const [value, setValue] = useState("");
  const [editValue, setEditValue] = useState(comment.content);
  const [expand, setExpand] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const toggleExpand = () => {
    setExpand((prev) => !prev);
  };

  const toggleEdit = () => {
    setEditMode((prev) => !prev);
  };

  const handleSubmit = () => {
    if (value.trim().length > 0) {
      onSubmitComment(comment.id, value);
      setValue("");
    }
  };

  const handleEditSubmit = () => {
    if (editValue.trim().length > 0) {
      onEditComment(comment.id, editValue);
      toggleEdit();
      setEditValue("");
    }
  };

  return (
    <div className="px-4 py-6 border-l-2 border-l-blue-500 bg-blue-500/10">
      <div>
        {editMode ? (
          <div className="flex items-start max-w-2xl gap-x-4">
            <textarea
              minLength={1}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              cols={50}
              className="border border-zinc-100 p-2 rounded-lg focus:outline-none"
              placeholder="Add a new comment..."
            />
            <div className="space-x-2 flex">
              <button
                onClick={handleEditSubmit}
                className="cursor-pointer text-sm px-4 py-2 bg-blue-500 rounded-lg w-fit"
              >
                Save
              </button>
              <button
                onClick={() => {
                  toggleEdit();
                  setEditValue("");
                }}
                className="cursor-pointer text-sm px-4 py-2 bg-rose-500 rounded-lg w-fit"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-lg lg:text-xl font-semibold">{comment.content}</p>
        )}

        <div className="mt-2 space-y-1">
          <p className="text-sm text-zinc-300">{comment.votes}</p>
          <p className="text-sm text-zinc-300">
            {new Date(comment.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={toggleExpand}
          className="cursor-pointer px-4 py-1 rounded-lg bg-blue-500"
        >
          {expand ? "Hide Replies" : "Reply"}
        </button>
        <button
          onClick={toggleEdit}
          className="cursor-pointer px-4 py-1 rounded-lg border"
        >
          Edit
        </button>
        <button
          onClick={() => onDeleteComment(comment.id)}
          className="cursor-pointer px-4 py-1 rounded-lg bg-rose-500"
        >
          Delete
        </button>
      </div>
      {expand && (
        <div className="mt-6 space-y-6">
          <div className="flex flex-col max-w-2xl gap-y-4">
            <textarea
              minLength={1}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={3}
              cols={50}
              className="border border-zinc-100 p-4 rounded-lg focus:outline-none"
              placeholder="Add a new comment..."
            />
            <button
              onClick={handleSubmit}
              className="cursor-pointer px-4 py-2 bg-blue-500 rounded-lg w-fit"
            >
              Add comment
            </button>
          </div>
          <div>
            {comment?.replies?.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                onSubmitComment={onSubmitComment}
                onEditComment={onEditComment}
                onDeleteComment={onDeleteComment}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Comment;
