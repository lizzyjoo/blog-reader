import { Link } from "react-router-dom";
import { useState } from "react";
import DOMPurify from "dompurify";
import { useAuth } from "../context/AuthContext";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import ManageSubscriptions from "./ManageSubscriptions";

export default function Settings() {
  const { user } = useAuth();
  // setting menu options
  const [activeMenu, setActiveMenu] = useState("account");

  // if they made an account via google or github, cannot change password
  const renderComponent = () => {
    switch (activeMenu) {
      case "account":
        if (user.authMethod === "github") {
          return <div>Logged in via GitHub</div>;
        } else if (user.authMethod === "google") {
          return <div>Logged in via Google</div>;
        } else {
          return (
            <div>
              <div>Current username: {user.username}</div>
              <ChangePassword />
            </div>
          );
        }

      case "delete":
        return (
          <div>
            <DeleteAccount />
          </div>
        );
      case "subscription":
        return <ManageSubscriptions />;
      default:
        return null;
    }
  };

  return (
    <>
      <button
        className={activeMenu === "account" ? "active" : ""}
        onClick={() => setActiveMenu("account")}
      >
        Account Settings
      </button>
      <button
        className={activeMenu === "subscription" ? "active" : ""}
        onClick={() => setActiveMenu("subscription")}
      >
        Manage Subscription
      </button>
      <button
        className={activeMenu === "delete" ? "active" : ""}
        onClick={() => setActiveMenu("delete")}
      >
        Delete Account
      </button>
      <main>{renderComponent()}</main>
    </>
  );
}
