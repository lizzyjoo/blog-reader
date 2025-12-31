import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { trashPost, restorePost } from "../api/api";
import heart from "../assets/heart.png";
import comment from "../assets/commentIcon.png";
import viewIcon from "../assets/viewIcon.png";

export default function ProfilePostCard({
  post,
  isOwnProfile,
  isTrashView,
  onPostUpdate,
}) {
  const token = localStorage.getItem("token");

  const postContentLimit = 500;
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

          {isOwnProfile && (
            <div className="post-status">
              {post.published ? "Published" : "Draft"}
              {post.trashedAt && " • Trashed"}
            </div>
          )}

          <Link to={`/posts/${post.id}`}>
            <div
              className="post-text"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(contentText),
              }}
            />
          </Link>

          <div className="post-menu">
            <Link to={`/posts/${post.id}`}>
              <div className="like-count">
                <img src={heart} alt="like" className="heart-icon" />
                <div className="like-number">{post.likes}</div>
              </div>
            </Link>
            <Link to={`/posts/${post.id}`}>
              <div className="comment-count">
                <img src={comment} alt="comment" className="comment-icon" />
                <div className="comment-number">
                  {post.comments?.length || 0}
                </div>
              </div>
            </Link>
            <div className="view-count">
              <img src={viewIcon} alt="view" className="view-icon" />
              <div className="view-number">{post.views}</div>
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
        </div>
      </article>
    </div>
  );
}
