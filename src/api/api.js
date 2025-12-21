// reusable api helper

const base_URL = "http://localhost:3000";

export async function getPosts() {
  const response = await fetch(`${base_URL}/posts`);
  const data = await response.json();
  return data;
}

export async function getPostById(id) {
  const response = await fetch(`${base_URL}/posts/${id}`);
  const data = await response.json();
  return data;
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
