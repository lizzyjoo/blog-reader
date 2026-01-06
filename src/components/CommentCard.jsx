export default function CommentCard({ comment }) {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const commentDate = new Date(comment.created_at);
  const commentDay = commentDate.getDate();
  const commentMonth = months[commentDate.getMonth()];
  const commentYear = commentDate.getFullYear();
  let commentHours = commentDate.getHours();
  let commentMinutes = commentDate.getMinutes();

  commentHours = commentHours < 10 ? "0" + commentHours : commentHours;
  commentMinutes = commentMinutes < 10 ? "0" + commentMinutes : commentMinutes;

  // Combine date and time into a single string
  const formattedDateTime = `${commentMonth} ${commentDay}, ${commentYear} ${commentHours}:${commentMinutes}`;

  return (
    <div className="comment-card" id={`comment-${comment.id}`}>
      <div className="comment-username">{comment.author.username}</div>
      <div className="comment-date">{formattedDateTime}</div>
      <div className="comment-content">{comment.content}</div>
    </div>
  );
}
