import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Signup from './component/Signup';
import Login from './component/Login';
import HomePage from './component/HomePage';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { setSocket } from './redux/socketSlice.js';
import {setOnlineUsers} from './redux/userSlice.js'

const router=createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Signup/>
  }
]);

function App() {
  const {authUser}=useSelector(store=>store.user);
  const {socket}=useSelector(store=>store.socket);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(authUser){
      const socket=io('http://localhost:3000',{
        query: {
          userId: authUser._id
        }
      });
      dispatch(setSocket(socket));

      socket.on('getOnlineUsers',(onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });
      return ()=>socket.close();
    }
    else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }
  },[authUser]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
