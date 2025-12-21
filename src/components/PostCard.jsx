import { Link } from "react-router-dom";
import heart from "../assets/heart.png";
import comment from "../assets/commentIcon.png";
import viewIcon from "../assets/viewIcon.png";

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
      <article className="content-wrapper">
        <div className="post-wrapper">
          <Link to={`/posts/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>

          <p className="author">By {post.author.username}</p>
          <Link to={`/posts/${post.id}`}>
            <p className="post-text">{contentText}</p>
          </Link>

          <div className="post-menu">
            <div className="like-count">
              <img src={heart} alt="like" className="heart-icon" />
            </div>
            <div className="comment-count">
              <img src={comment} alt="comment" className="comment-icon" />
            </div>
            <div className="view-count">
              <img src={viewIcon} alt="view" className="view-icon" />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
