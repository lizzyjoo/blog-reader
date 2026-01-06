import "../styles/login.css";
import googleIcon from "../assets/google.png";
import githubIcon from "../assets/github.png";

export default function OAuthButtons() {
  const API_URL = "http://localhost:3000";

  return (
    <div className="oauth-buttons">
      <a href={`${API_URL}/auth/github`} className="oauth-btn github">
        <img src={githubIcon} alt="github" className="oauth-logo" />
        GitHub
      </a>

      <a href={`${API_URL}/auth/google`} className="oauth-btn google">
        <img src={googleIcon} alt="google" className="oauth-logo" />
        Google
      </a>
    </div>
  );
}
