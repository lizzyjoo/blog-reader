import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { useAuth } from "../context/AuthContext";
import LikeSaveButtons from "./LikeSaveButtons";
import "../styles/postcard.css";

// more focus on the post title and minimal card layout

export default function SavedPostCard({ post }) {
  const { user } = useAuth();
  const postSavedAt = post.savedAt;
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
  const postSavedDay = postSavedAt.split("-")[2].split("T")[0];
  const postSavedMonth = months[Number(postSavedAt.split("-")[1]) - 1];
  const postSavedYear = postSavedAt.split("-")[0];
  // If viewing own post, link to /me
  const authorLink =
    user?.id === post.author.id
      ? "/me"
      : `/users/${post.author.username}/profile`;

  return (
    <>
      <div className="minCardDiv">
        <div className="minCard-savedAt">
          <p>saved</p>
          <p>
            {postSavedMonth} {postSavedDay}, {postSavedYear}
          </p>
        </div>
        <div className="minCard-title">{post.title}</div>
        <div className="minCar-username">
          <Link to={authorLink}>{post.author.username}</Link>
        </div>
        <Link to={`/posts/${post.id}`}>
          <div
            className="post-text"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(contentText),
            }}
          />
        </Link>
        <div className="post-like-save">
          <LikeSaveButtons postId={post.id} initialLikes={post.likes} />
          <div className="view-count">{post.views} views</div>
        </div>
      </div>
    </>
  );
}
