// display user's subscription list
import { Link } from "react-router-dom";
export default function SubscriptionPage({ following }) {
  return (
    <>
      <div className="following-list">
        {following.map((followedUser) => (
          <div key={followedUser.id} className="following-item">
            <Link to={`/users/${followedUser.username}/profile`}>
              @{followedUser.username}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
