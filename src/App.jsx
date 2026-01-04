import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./components/UserProfile";
import Login from "./components/Login";
import Register from "./components/Register";
import PostList from "./components/PostList";
import PostPage from "./components/PostPage";
import AuthorPostList from "./components/AuthorPostList";
import CreatePost from "./components/CreatePost";
import Settings from "./components/Settings";
import SavedPosts from "./components/SavedPosts";
import SearchResults from "./components/SearchResults";
import EditPost from "./components/EditPost";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthCallback from "./pages/AuthCallback";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="app-wrapper">
      <div id="fixed-header-bg"></div>
      <Header />
      <div className="outer-wrapper">
        <main className="app-content">
          <Routes>
            {/* Blog main home page */}
            <Route path="/" element={<PostList />} />
            {/* Specific post */}
            <Route path="/posts/:id" element={<PostPage />} />
            {/* Editing a post: protected */}
            <Route
              path="/posts/:id/edit"
              element={
                <ProtectedRoute>
                  <EditPost />
                </ProtectedRoute>
              }
            />
            {/* Comment Section of a post */}
            <Route path="/posts/:id/comments" element={<PostPage />} />
            {/* Specific comment of a post */}
            <Route path="/posts/:id/comments/:id" element={<PostPage />} />
            {/* Creating a new post: protected */}
            <Route
              path="/posts/new"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            {/* 3rd party login callback */}
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/register" element={<Register />} />
            {/* User's Own Profile Page */}
            <Route
              path="/me"
              element={
                <ProtectedRoute>
                  <UserProfile></UserProfile>
                </ProtectedRoute>
              }
            />
            {/* User Saved Posts */}
            <Route
              path="/saved"
              element={
                <ProtectedRoute>
                  <SavedPosts></SavedPosts>
                </ProtectedRoute>
              }
            />
            <Route path="/users/:username" element={<AuthorPostList />} />
            {/* User Profile Page, anyone can view; authcontext for author specific op*/}
            <Route
              path="/users/:username/profile"
              element={<UserProfile></UserProfile>}
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings></Settings>
                </ProtectedRoute>
              }
            />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
