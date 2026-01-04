// reusable api helper

const base_URL = "http://localhost:3000";

export async function getPosts(
  sort = "recent",
  authorId = null,
  filter = null
) {
  let url = `${base_URL}/posts?sort=${sort}`;
  if (authorId) url += `&authorId=${authorId}`;
  if (filter) url += `&filter=${filter}`;

  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.json();
}
export async function getSubscribedPosts() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${base_URL}/posts/subscribed`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.json();
}

export async function getpublishedPosts() {
  const response = await fetch(`${base_URL}/posts?published=true`);
  const data = response.json();
  return data;
}

export async function getSubscribeList() {
  const response = await fetch(`${base_URL}/posts?published=true`);
}
export async function getMyDrafts(token) {
  const response = await fetch(`${base_URL}/posts?published=false`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = response.json();
  return data;
}

export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${base_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return data;
}

export async function getPostById(id) {
  const response = await fetch(`${base_URL}/posts/${id}`);
  const data = await response.json();
  return data;
}

export async function createPost({ title, content, published }) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${base_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content, published }),
  });
  const data = await response.json();
  return data;
}
export async function updatePost(id, { title, content, published }) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${base_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content, published }),
  });
  return response.json();
}
export async function getComments() {
  const response = await fetch(`${base_URL}/comments`);
  const data = await response.json();
  return data;
}

export async function getCommentById(id) {
  const response = await fetch(`${base_URL}/comments/${id}`);
  const data = await response.json();
  return data;
}

export async function getUserById(id) {
  const response = await fetch(`${base_URL}/users/${id}`);
  const data = await response.json();
  return data;
}

export async function getUserPosts(id) {
  const response = await fetch(`${base_URL}/users/${id}/posts`);
  const data = await response.json();
  return data;
}

export async function followUser(username, token) {
  const response = await fetch(`${base_URL}/users/${username}/follow`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function unfollowUser(username, token) {
  const response = await fetch(`${base_URL}/users/${username}/follow`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function checkFollowing(username, token) {
  const response = await fetch(`${base_URL}/users/${username}/follow`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function searchPosts(query) {
  const response = await fetch(
    `${base_URL}/posts/search?q=${encodeURIComponent(query)}`
  );
  return response.json();
}

export async function trashPost(postId, token) {
  const response = await fetch(`${base_URL}/posts/${postId}/trash`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}

export async function restorePost(postId, token) {
  const response = await fetch(`${base_URL}/posts/${postId}/restore`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}

export async function viewPost(postId) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${base_URL}/posts/${postId}/view`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.json();
}

export async function likePost(postId, token) {
  const response = await fetch(`${base_URL}/posts/${postId}/like`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}

export async function unlikePost(postId, token) {
  const response = await fetch(`${base_URL}/posts/${postId}/like`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}

export async function savePost(postId, token) {
  const response = await fetch(`${base_URL}/posts/${postId}/save`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}

export async function unsavePost(postId, token) {
  const response = await fetch(`${base_URL}/posts/${postId}/save`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}

export async function getPostStatus(postId, token) {
  const response = await fetch(`${base_URL}/posts/${postId}/status`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}
