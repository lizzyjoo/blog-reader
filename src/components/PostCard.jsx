import "../styles/postcard.css";
export default function PostCard({ post }) {
  const postContentLimit = 500;
  let contentText = "";
  if (post.content.length > postContentLimit) {
    contentText = post.content.slice(0, postContentLimit) + " ...";
  } else {
    contentText = post.content;
  }
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
  const postDay = post.created_at.split("-")[2].split("T")[0];
  const postMonthNum = post.created_at.split("-")[1];
  const postMonth = months[postMonthNum - 1];
  const postYear = post.created_at.split("-")[0];

  return (
    <div className="postMinDiv">
      <div className="post-date">
        <div className="date-day">{postDay}</div>
        <div className="date-month-year">
          <span className="date-month">{postMonth}</span>
          <span className="date-hyphen">-</span>
          <span className="date-year">{postYear}</span>
        </div>
      </div>
      <div className="post-wrapper">
        <h3>{post.title}</h3>
        <p className="author">By {post.author.username}</p>
        <p className="post-text">{contentText}</p>
      </div>
      <div className="post-menu"></div>
    </div>
  );
}
