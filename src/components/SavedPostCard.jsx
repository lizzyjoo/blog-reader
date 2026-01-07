import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/profile-postcard.css";

export default function SavedPostCard({ post }) {
  const { user } = useAuth();

  // Strip HTML tags for preview
  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const postContentLimit = 200;
  const plainText = stripHtml(post.content);
  const contentText =
    plainText.length > postContentLimit
      ? plainText.slice(0, postContentLimit) + "..."
      : plainText;

  const postSavedAt = post.savedAt;
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
  const postSavedDay = postSavedAt.split("-")[2].split("T")[0];
  const postSavedMonth = months[Number(postSavedAt.split("-")[1]) - 1];
  const postSavedYear = postSavedAt.split("-")[0];

  const authorLink =
    user?.id === post.author.id
      ? "/me"
      : `/users/${post.author.username}/profile`;

  return (
    <div className="profile-card">
      <div className="date-time-container">
        <time className="date-time">
          <span>{postSavedYear}</span>
          <span className="separator" />
          <span>
            {postSavedMonth} {postSavedDay}
          </span>
        </time>
      </div>
      <div className="content">
        <div className="infos">
          <Link to={`/posts/${post.id}`}>
            <span className="title">{post.title}</span>
          </Link>
          <Link to={authorLink} className="saved-author">
            @{post.author.username}
          </Link>
          <Link to={`/posts/${post.id}`}>
            <p className="description">{contentText}</p>
          </Link>
        </div>
        <Link className="action" to={`/posts/${post.id}`}>
          Read Post
        </Link>
      </div>
    </div>
  );
}
