import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  const { selectedUser,onlineUsers } = useSelector((store) => store.user);
  const {authUser}=useSelector((store)=>store.user)

  const dispatch=useDispatch();
  // useEffect(()=>{
  //   return ()=>dispatch(setSelectedUser(null));
  // },[])

  const isOnline=onlineUsers?.includes(selectedUser?._id);
  return (
    <>
      {selectedUser ? (
        <div className="md:min-w-[550px] flex flex-col">
          <div className="flex gap-2 items-center bg-gray-200 p-2 mx-2">
            <div className={`avatar ${isOnline? 'online' : ''}`}>
              <div className="w-10 rounded-full ">
                <img src={selectedUser?.profilePhoto} alt="" />
              </div>
            </div>
            <div>
              <div>
                <p className="text-gray-500 font-semibold">
                  {selectedUser?.fullName}
                </p>
              </div>
            </div>
          </div>
          <Messages />
          <SendInput />
        </div>
      ) : (
        <div className="md:min-w-[550px] flex flex-col justify-center items-center">
          <h1 className="font-bold text-black text-4xl">Hi, {authUser?.fullName}</h1>
          <h1 className="font-bold text-black text-xl">Let's Start Conversation</h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
