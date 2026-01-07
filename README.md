# URTEXT Reader

Public-facing frontend for the URTEXT blogging platform.

# URTEXT Blog Platform

A full-stack blogging platform built for readers and writers who appreciate clean, distraction-free content. The name _Urtext_ comes from music publishing: "original, unedited version of a score." The app is designed for any classical music enthusiasts who wish to be able to write music posts seamlessly (Music notation support to come!).

**Live:** [blog-reader-lyart.vercel.app](https://blog-reader-lyart.vercel.app)

## Tech Stack

- **Framework:** React 18
- **Routing:** React Router v6
- **Editor:** TinyMCE
- **Styling:** CSS (custom)
- **Deployment:** Vercel

## Features

- Browse and read blog posts
- User registration and login (local + OAuth)
- Rich text post creation with TinyMCE
- Follow authors and view subscribed feed
- Like and save posts
- Comment on posts
- User profiles with post listings
- Search posts
- Responsive design

## Setup

### Prerequisites

- Node.js (v18+)
- Running instance of [blog-api](https://github.com/lizzyjoo/blog-api)

### Installation

```bash
git clone https://github.com/lizzyjoo/blog-reader
cd blog-reader
npm install
```

### Environment Variables

Create a `.env` file:

```
VITE_API_URL=http://localhost:3000
```

For production, point to your deployed API:

```
VITE_API_URL=https://your-api.railway.app
```

### Run

```bash
npm run dev
```

App runs at `http://localhost:5173`

### Build

```bash
npm run build
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── PostCard.jsx
│   ├── ProfilePostCard.jsx
│   ├── CommentCard.jsx
│   ├── CommentsSection.jsx
│   ├── FollowButton.jsx
│   ├── SearchBar.jsx
│   ├── SortDropdown.jsx
│   └── ...
├── pages/
│   ├── Home.jsx
│   ├── Post.jsx
│   ├── Profile.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Settings.jsx
│   ├── About.jsx
│   ├── NotFound.jsx
│   └── ...
├── context/
│   └── AuthContext.jsx
├── styles/
│   └── *.css
├── api.js
├── App.jsx
└── main.jsx
```

## Pages

| Route                      | Component      | Description                     |
| -------------------------- | -------------- | ------------------------------- |
| `/`                        | Home           | Post feed (discover/subscribed) |
| `/posts/:id`               | Post           | Single post view                |
| `/users/:username`         | UserHome       | User's public profile           |
| `/users/:username/profile` | Profile        | User's profile with tabs        |
| `/login`                   | Login          | Login form                      |
| `/register`                | Register       | Registration form               |
| `/settings`                | Settings       | Account settings                |
| `/saved`                   | SavedPosts     | User's saved posts              |
| `/search`                  | Search         | Search results                  |
| `/about`                   | About          | About page                      |
| `/auth/callback`           | AuthCallback   | OAuth redirect handler          |
| `/forgot-password`         | ForgotPassword | Password reset request          |
| `/reset-password`          | ResetPassword  | Password reset form             |
| `*`                        | NotFound       | 404 page                        |

## Design Credits

| Element         | Source                                                                            |
| --------------- | --------------------------------------------------------------------------------- |
| Blog UI         | [typography-themexpose](https://typography-themexpose.blogspot.com/)              |
| Profile card    | [uiverse.io - quiet-bear-76](https://uiverse.io/Yaya12085/quiet-bear-76)          |
| 404 emoji       | [Figma Community](https://www.figma.com/community/file/1280863093339672805)       |
| Login form      | [Figma Community](https://www.figma.com/community/file/1401478816577651579)       |
| Settings button | [uiverse.io - popular-octopus-83](https://uiverse.io/portseif/popular-octopus-83) |
| Comments        | [uiverse.io - quiet-turkey-90](https://uiverse.io/zanina-yassine/quiet-turkey-90) |
| About quail     | [uiverse.io - lazy-quail-10](https://uiverse.io/AatreyuShau/lazy-quail-10)        |

## Related Repos

- [blog-project](https://github.com/lizzyjoo/blog-project) — Development orchestrator
- [blog-api](https://github.com/lizzyjoo/blog-api) — Backend API
- [blog-admin](https://github.com/lizzyjoo/blog-admin) — Admin dashboard
