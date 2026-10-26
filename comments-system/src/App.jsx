import { useState } from "react";
import "./App.css";

const initialComments = [
  {
    id: 1,
    text: "Great article!",
    author: "Sam",
    replies: [
      {
        id: 2,
        text: "Thanks for sharing!",
        author: "Alex",
        replies: [
          {
            id: 3,
            text: "You're welcome!",
            author: "Sam",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    text: "I learned something new.",
    author: "Priya",
    replies: [],
  },
];

// Add a comment or reply at any nesting level
function addComment(comments, parentId, newComment) {
  if (parentId === null) {
    return [...comments, newComment];
  }

  return comments.map((comment) => {
    if (comment.id === parentId) {
      return {
        ...comment,
        replies: [...comment.replies, newComment],
      };
    }

    return {
      ...comment,
      replies: addComment(
        comment.replies,
        parentId,
        newComment
      ),
    };
  });
}

// Delete a comment and all its nested replies
function deleteComment(comments, targetId) {
  return comments
    .filter((comment) => comment.id !== targetId)
    .map((comment) => ({
      ...comment,
      replies: deleteComment(comment.replies, targetId),
    }));
}

// Recursive comment component
function Comment({
  comment,
  onReply,
  onDelete,
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = (event) => {
    event.preventDefault();

    const text = replyText.trim();

    if (!text) return;

    onReply(comment.id, text);

    setReplyText("");
    setShowReplyForm(false);
  };

  return (
    <div className="comment">
      <div className="comment-box">
        <h4>{comment.author}</h4>

        <p>{comment.text}</p>

        <div className="comment-actions">
          <button
            type="button"
            onClick={() =>
              setShowReplyForm((previous) => !previous)
            }
          >
            {showReplyForm ? "Cancel" : "Reply"}
          </button>

          <button
            type="button"
            className="delete-btn"
            onClick={() => onDelete(comment.id)}
          >
            Delete
          </button>
        </div>

        {showReplyForm && (
          <form onSubmit={handleReply} className="reply-form">
            <input
              type="text"
              placeholder="Write a reply..."
              value={replyText}
              onChange={(event) =>
                setReplyText(event.target.value)
              }
              aria-label={`Reply to ${comment.author}`}
            />

            <button type="submit">Send</button>
          </form>
        )}
      </div>

      {comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = (event) => {
    event.preventDefault();

    const text = newComment.trim();

    if (!text) return;

    const comment = {
      id: crypto.randomUUID(),
      text,
      author: "You",
      replies: [],
    };

    setComments((previousComments) =>
      addComment(previousComments, null, comment)
    );

    setNewComment("");
  };

  const handleReply = (parentId, text) => {
    const reply = {
      id: crypto.randomUUID(),
      text,
      author: "You",
      replies: [],
    };

    setComments((previousComments) =>
      addComment(previousComments, parentId, reply)
    );
  };

  const handleDelete = (commentId) => {
    setComments((previousComments) =>
      deleteComment(previousComments, commentId)
    );
  };

  return (
    <div className="app">
      <div className="comments-container">
        <h1>Comments</h1>

        <form
          className="main-comment-form"
          onSubmit={handleAddComment}
        >
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(event) =>
              setNewComment(event.target.value)
            }
            aria-label="Write a comment"
          />

          <button type="submit">Add Comment</button>
        </form>

        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="empty-message">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onReply={handleReply}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;