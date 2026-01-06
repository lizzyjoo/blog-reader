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
            <div className="setting-section-wrapper">
              <div className="setting-section-name">Change Password</div>
              <div className="setting-section-caption">
                Current username: {user.username}
              </div>
              <ChangePassword />
            </div>
          );
        }

      case "delete":
        return (
          <div className="setting-section-wrapper">
            <DeleteAccount />
          </div>
        );
      case "subscription":
        return (
          <div className="setting-section-wrapper">
            <ManageSubscriptions />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="setting-btn-wrapper">
        <button
          className={`${
            activeMenu === "account" ? "active" : ""
          } setting-option-btn`}
          onClick={() => setActiveMenu("account")}
        >
          Change Password
        </button>
        <button
          className={`${
            activeMenu === "subscription" ? "active" : ""
          } setting-option-btn`}
          onClick={() => setActiveMenu("subscription")}
        >
          Manage Subscription
        </button>
        <button
          className={`${
            activeMenu === "delete" ? "active" : ""
          } setting-option-btn`}
          onClick={() => setActiveMenu("delete")}
        >
          Delete Account
        </button>
      </div>

      <main>{renderComponent()}</main>
    </>
  );
}
