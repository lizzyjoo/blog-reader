// display user's subscription list
export default function SubscriptionPage({ following }) {
  if (!following || following.length === 0) {
    return <p>Not following anyone yet.</p>;
  }

  return (
    <>
      <div className="following-list">
        {following.map((followedUser) => (
          <div key={followedUser.id} className="following-item">
            <Link to={`/users/${followedUser.username}/profile`}>
              @{followedUser.username}
            </Link>
            {followedUser.first_name && (
              <span>
                {" "}
                - {followedUser.first_name} {followedUser.last_name}
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
