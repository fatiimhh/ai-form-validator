import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import "../styles/UserDropdown.css";

const UserDropdown = ({ user, setUser }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      setUser(null);  // Clear user state in parent
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed, try again.");
    }
  };

  return (
    <div className="user-dropdown">
      <button onClick={() => setDropdownOpen(!dropdownOpen)} className="user-button">
        Signed in as {user.displayName}
      </button>
      {dropdownOpen && (
        <div className="dropdown-menu">
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;


