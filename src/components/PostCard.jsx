import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import heart from "../assets/heart.png";
import comment from "../assets/commentIcon.png";
import viewIcon from "../assets/viewIcon.png";
import "../styles/postcard.css";

export default function PostCard({ post }) {
  const { user } = useAuth();

  // strip HTML tags to get plain text
  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const postContentLimit = 500;
  const plainText = stripHtml(post.content);
  const contentText =
    plainText.length > postContentLimit
      ? plainText.slice(0, postContentLimit) + "..."
      : plainText;

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
  const postMonth = months[Number(post.created_at.split("-")[1]) - 1];
  const postYear = post.created_at.split("-")[0];

  // if viewing own post, link to /me, otherwise /users/:username
  const authorLink =
    user?.id === post.author.id
      ? "/me"
      : `/users/${post.author.username}/profile`;

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
            <div className="post-title">{post.title}</div>
          </Link>

          <p className="author">
            By <Link to={authorLink}>{post.author.username}</Link>
          </p>

          <Link to={`/posts/${post.id}`}>
            <p className="post-text">{contentText}</p>
          </Link>

          <div className="post-menu">
            <Link to={`/posts/${post.id}`}>
              <div className="post-count" id="like-count">
                <div className="post-icon">
                  <img src={heart} alt="like" id="heart-icon" />
                </div>

                <div className="like-number">{post.likes}</div>
              </div>
            </Link>
            <Link to={`/posts/${post.id}`}>
              <div className="post-count">
                <div className="post-icon">
                  <img src={comment} alt="comment" className="comment-icon" />
                </div>
                <div className="comment-number">{post.comments.length}</div>
              </div>
            </Link>
            <Link to={`/posts/${post.id}`}>
              <div className="post-count">
                <div className="post-icon">
                  <img src={viewIcon} alt="view" className="view-icon" />
                </div>

                <div className="view-number">{post.views}</div>
              </div>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
