export default function Comments({ comment }) {
  return (
    <div className="comment-div" key={comment.id} id={`comment-${comment.id}`}>
      <p>
        <strong>{comment.author.username}:</strong> {comment.content}
      </p>
    </div>
  );
}
