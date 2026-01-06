// display user's following list
import { Link } from "react-router-dom";
export default function FollowingPage({ subscribers }) {
  return (
    <>
      <div className="following-list">
        {subscribers.map((subscribedUser) => (
          <div key={subscribedUser.id} className="following-item">
            <Link to={`/users/${subscribedUser.username}/profile`}>
              @{subscribedUser.username}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
