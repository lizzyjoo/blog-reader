import "./App.css";
import PostList from "../../blog-reader/src/components/PostList";
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
          <PostList />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
