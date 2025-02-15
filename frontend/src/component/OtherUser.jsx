import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser,onlineUsers } = useSelector((store) => store.user);
  
  const isOnline=onlineUsers?.includes(user._id);

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };
  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        className={`${
          selectedUser?._id === user?._id ? "bg-gray-300" : ""
        } flex gap-2 items-center hover:bg-gray-300 p-2 rounded-xl cursor-pointer`}
      >
        <div className={`avatar ${isOnline? 'online' : ''}`}>
          <div className="w-10 rounded-full ">
            <img src={user?.profilePhoto} alt="" />
          </div>
        </div>
        <div>
          <div>
            <p className="text-gray-500 font-semibold">{user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-2 h-1"></div>
    </>
  );
};

export default OtherUser;
