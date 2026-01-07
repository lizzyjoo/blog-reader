import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { trashPost, getPostById, viewPost } from "../api/api";
import DOMPurify from "dompurify";
import CommentsSection from "./CommentsSection";
import LikeSaveButtons from "./LikeSaveButtons";
import OptionsDropdown from "./OptionsDropdown";
import NotFound from "../pages/NotFound";
import "../styles/postpage.css";

export default function PostPage() {
  const { id, commentId } = useParams();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const commentSectionRef = useRef(null);
  const hasViewed = useRef(false);

  useEffect(() => {
    async function fetchPost() {
      const data = await getPostById(id);
      if (data.error) {
        setError(data.error);
      } else {
        setPost(data);
        if (!hasViewed.current) {
          hasViewed.current = true;
          viewPost(id);
        }
      }
    }
    fetchPost();
  }, [id]);

  async function handleDelete() {
    if (confirm("Move this post to trash?")) {
      await trashPost(id, token);
      navigate("/me");
    }
  }

  function handleEdit() {
    navigate(`/posts/${id}/edit`);
  }

  useEffect(() => {
    if (post && location.pathname.includes("/comments")) {
      setTimeout(() => {
        if (commentId) {
          const commentEl = document.getElementById(`comment-${commentId}`);
          if (commentEl) {
            commentEl.scrollIntoView({ behavior: "smooth" });
          }
        } else if (commentSectionRef.current) {
          commentSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [post, location.pathname, commentId]);

  if (error) {
    return <NotFound />;
  } else if (!post) {
    return <div>Loading...</div>;
  }

  const isAuthor = user?.id === post?.authorId;
  const authorLink =
    user?.id === post.author.id
      ? "/me"
      : `/users/${post.author.username}/profile`;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const postDay = post.created_at.split("-")[2].split("T")[0];
  const postMonth = months[Number(post.created_at.split("-")[1]) - 1];
  const postYear = post.created_at.split("-")[0];

  return (
    <div className="post-div">
      <div className="post-content" key={id}>
        <div className="post-header">
          <div className="post-title">{post.title}</div>
          {isAuthor && (
            <OptionsDropdown
              onEdit={handleEdit}
              onDelete={handleDelete}
              className="post"
            />
          )}
        </div>
        <div className="post-info">
          <p>
            by
            <Link to={authorLink}>
              <span id="author-name">{post.author.username}</span>
            </Link>
            <span className="slash">/</span>
            {postMonth} {postDay}, {postYear}
            <span className="slash">/</span>
            {post.comments.length === 1
              ? `${post.comments.length} comment`
              : `${post.comments.length} comments`}
            <span className="slash">/</span>
            {post.views === 1 ? `${post.views} view` : `${post.views} views`}
          </p>
        </div>

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        />

        <div className="post-actions-row">
          <LikeSaveButtons postId={post.id} initialLikes={post.likes} />
        </div>
      </div>
      <div className="comments-wrapper" ref={commentSectionRef}>
        <CommentsSection postId={post.id} />
      </div>
    </div>
  );
}
