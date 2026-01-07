import "../styles/footer.css";
import { Link } from "react-router-dom";
import githubIcon from "../assets/github.png";
import linkedinIcon from "../assets/linkedin.png";
export default function Footer() {
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="footer-options">
          <Link to={"/about"}>About</Link>
        </div>
        <div className="creator-info">
          <Link to={"/about"}>
            {" "}
            <div>©Lizzy Joo</div>
          </Link>

          <div className="social-media">
            <a
              href="https://github.com/lizzyjoo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="info" className="footer-icon" />
            </a>
            <a
              href="https://linkedin.com/in/lizzyjoo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinIcon} alt="info" className="footer-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
