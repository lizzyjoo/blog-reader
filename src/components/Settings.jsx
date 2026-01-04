// can change password, delete account, logout,
// view account details: cannot change username or email though
// account details: username, email, password (hashed), account creation date, subscribed to list
// can add or remove items from subscribed to list
// nav fields: account details, change password, delete account, logout, subscribed to list
import ChangePassword from "./ChangePassword";
export default function Settings() {
  return (
    <>
      <div>testing settings</div>
      <ChangePassword />
    </>
  );
}
