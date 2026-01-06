import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { trashPost, restorePost } from "../api/api";
import "../styles/profile-postcard.css";
// import heart from "../assets/heart.png";
// import comment from "../assets/commentIcon.png";
// import viewIcon from "../assets/viewIcon.png";

export default function ProfilePostCard({
  post,
  isOwnProfile,
  isTrashView,
  onPostUpdate,
}) {
  const token = localStorage.getItem("token");

  const postContentLimit = 200;
  const contentText =
    post.content.length > postContentLimit
      ? post.content.slice(0, postContentLimit) + " ..."
      : post.content;

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

  async function handleTrash() {
    await trashPost(post.id, token);
    onPostUpdate();
    window.location.reload();
  }

  async function handleRestore() {
    await restorePost(post.id, token);
    onPostUpdate();
    window.location.reload();
  }

  return (
    <div className="profile-card">
      <div className="date-time-container">
        <time className="date-time" dateTime="2022-10-10">
          <span>{postYear}</span>
          <span className="separator" />
          <span>
            {postMonth} {postDay}
          </span>
        </time>
      </div>
      <div className="content">
        <div className="infos">
          <Link to={`/posts/${post.id}`}>
            <span className="title">{post.title}</span>
          </Link>
          <Link to={`/posts/${post.id}`}>
            <p
              className="description"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(contentText),
              }}
            ></p>
          </Link>
        </div>
        <Link className="action" Link to={`/posts/${post.id}`}>
          Read Post
        </Link>
      </div>
      {isOwnProfile && (
        <div className="post-actions">
          {isTrashView ? (
            <button onClick={handleRestore} className="restore-btn">
              Restore
            </button>
          ) : (
            <button onClick={handleTrash} className="trash-btn">
              Trash
            </button>
          )}
        </div>
      )}
    </div>
  );
}
