import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setMessages } from '../redux/messageSlice.js';

const useGetRealTimeMessage = () => {
  const {socket}=useSelector(store=>store.socket);
  const {messages}=useSelector(store=>store.message);
  const dispatch=useDispatch();
  useEffect(() => {
    const safeMessages = Array.isArray(messages) ? messages : []; // Ensure it's an array
    socket?.on('newMessage', (newMessage) => {
      dispatch(setMessages([...safeMessages, newMessage]));
    });

    // Clean up socket listener on unmount or when socket changes
    return () => {
      socket?.off('newMessage');
    };
  }, [socket, dispatch, messages]);
}

export default useGetRealTimeMessage