import React, { useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice.js";

const SendInput = () => {
  const scroll=useRef();
  const [message,setMessage]=useState("");
  const dispatch=useDispatch();
  const {selectedUser}=useSelector(state=>state.user);
  const {messages}=useSelector(store=>store.message);

  const onSubmitHandler=async (e)=>{
    e.preventDefault();
    try {
      const res=await axios.post(`http://localhost:3000/api/v1/message/send/${selectedUser?._id}`,{message},{
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log(res);
      dispatch(setMessages([...messages,res.data.newMessage]));

      
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  }
  return (
    <form action="" onSubmit={onSubmitHandler} className="px-4 my-3">
      <div className="w-full relative ">
        <input
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          className="border text-sm rounded-lg block w-full bg-gray-300 p-3 text-black"
          type="text"
          placeholder="Send a message...."
        />
        <button type="submit" className="absolute flex items-center inset-y-0 end-1 w-8"><IoIosSend/></button>
      </div>
    </form>
  );
};

export default SendInput;
