import { useState, useEffect } from "react";
import { getCurrentUser } from "../api/api";

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const data = await getCurrentUser();
      setUser(data);
    }
    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>
        {user.first_name} {user.last_name}
      </h1>
      <p>@{user.username}</p>
      <p>{user.email}</p>
    </div>
  );
}
