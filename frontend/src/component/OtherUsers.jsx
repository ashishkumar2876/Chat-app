import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers.js";
import { useSelector } from "react-redux";

const OtherUsers = () => {
  useGetOtherUsers();  // Assuming this hook fetches the user data
  const { otherUsers } = useSelector((store) => store.user);

  // If OtherUsers is null or undefined, return null to render nothing
  if (!OtherUsers) {
    return null; 
  }

  return (
    <div className="overflow-auto flex-1">
      {/* Safely map over OtherUsers if it's an array */}
      {otherUsers?.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default OtherUsers;
