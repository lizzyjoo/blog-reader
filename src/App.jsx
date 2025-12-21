import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PostList from "./components/PostList";
import PostPage from "./components/PostPage";
import CreatePost from "./components/CreatePost";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="app-wrapper">
      <div id="fixed-header-bg"></div>
      <Header />
      <div className="outer-wrapper">
        <main className="app-content">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/posts/:id/comments" element={<PostPage />} />
            <Route path="/posts/:id/comments/:id" element={<PostPage />} />
            <Route
              path="/posts/new"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
