import axios from "axios";
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {useDispatch} from 'react-redux'
import { setAuthUser } from "../redux/userSlice.js";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const onSubmitHandler =async (e) => {
    e.preventDefault();
    try {
      const res=await axios.post(`http://localhost:3000/api/v1/user/login`,user,{
       headers: {
         'Content-Type': 'application/json'
       },
       withCredentials: true
      });
      if(res.data.success){
       toast.success(res.data.message);
       navigate('/');
       dispatch(setAuthUser(res.data.user))
      }
   } catch (error) {
     toast.error(error.message);
   }
    setUser({
      username: "",
      password: "",
    });
  };
  return (
    <div className="min-w-96">
      <div className="w-full p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-600">Login</h1>
        <form action="" onSubmit={onSubmitHandler}>
          <div className="flex flex-col gap-2  mt-4">
            <label>
              <span className="text-base label-text p-2 m-2 font-semibold">
                Username
              </span>
            </label>
            <input
              value={user.username}
              onChange={(e)=>setUser({...user,username: e.target.value})}
              className="text-black bg-gray-100 w-full rounded-md h-10 px-2"
              type="text"
              placeholder="Ashish123"
            />
            <label>
              <span className="text-base label-text p-2 m-2 font-semibold">
                Password
              </span>
            </label>
            <input
              value={user.password}
              onChange={(e)=>setUser({...user,password: e.target.value})}
              className="text-black bg-gray-100 w-full rounded-md h-10 px-2"
              type="password"
              placeholder="*****"
            />
          </div>
          <div className="text-center mt-2">
            <Link to="/register" className="font-semibold text-blue-700">
              Dont have an account? Signup
            </Link>
          </div>

          <div className="m-3">
            <button type="submit" className="btn btn-block btn-sm">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
