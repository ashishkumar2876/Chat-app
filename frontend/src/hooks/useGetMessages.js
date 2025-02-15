import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = () => {
  const {selectedUser}=useSelector(store=>store.user);
  const dispatch=useDispatch();
  useEffect(() => {
    try {
      const fetchMessages = async () => {
        try {
          axios.defaults.withCredentials = true;
          const res = await axios.get(
            `http://localhost:3000/api/v1/message/${selectedUser?._id}`
          );
          dispatch(setMessages(res.data));
        } catch (error) {
          console.log(error);
        }
      };
      fetchMessages();
    } catch (error) {
      console.log(error);
    }
  }, [selectedUser?._id,setMessages]);
};

export default useGetMessages;
