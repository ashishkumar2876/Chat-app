import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast"
const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate=useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender: gender });
  };
  const onSubmitHandler =async (e) => {
    e.preventDefault();
    try {
       const res=await axios.post(`http://localhost:3000/api/v1/user/register`,user,{
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
       });
       if(res.data.success){
        toast.success(res.data.message);
        navigate('/login')
       }
    } catch (error) {
      toast.error(error.message)
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };
  return (
    <div className="min-w-96">
      <div className="w-full p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-600">Signup</h1>
        <form action="" onSubmit={onSubmitHandler}>
          <div className="flex flex-col gap-2  mt-4">
            <label>
              <span className="text-base label-text p-2 m-2 font-semibold">
                Fullname
              </span>
            </label>
            <input
              className="text-black bg-gray-100 w-full rounded-md h-10 px-2"
              type="text"
              placeholder="Ashish"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
            />
            <label>
              <span className="text-base label-text p-2 m-2 font-semibold">
                Username
              </span>
            </label>
            <input
              className="text-black bg-gray-100 w-full rounded-md h-10 px-2"
              type="text"
              placeholder="Ashish123"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <label>
              <span className="text-base label-text p-2 m-2 font-semibold">
                Password
              </span>
            </label>
            <input
              className="text-black bg-gray-100 w-full rounded-md h-10 px-2"
              type="password"
              placeholder="*****"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <label>
              <span className="text-base label-text p-2 m-2 font-semibold">
                Confirm Password
              </span>
            </label>
            <input
              className="text-black bg-gray-100 w-full rounded-md h-10 px-2"
              type="password"
              placeholder="*****"
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
            />
            <div className="flex justify-center gap-8">
              <div className="flex gap-3">
                <p className="font-semibold text-gray-600">Male</p>
                <input
                  checked={user.gender == "male"}
                  onChange={() => handleCheckbox("male")}
                  type="checkbox"
                  defaultChecked
                  className="checkbox"
                />
              </div>
              <div className="flex gap-3">
                <p className="font-semibold text-gray-600">Female</p>
                <input
                  checked={user.gender == "female"}
                  onChange={() => handleCheckbox("female")}
                  type="checkbox"
                  defaultChecked
                  className="checkbox"
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-2">
            <Link to="/login" className="font-semibold text-blue-700">
              Already have an account? Login
            </Link>
          </div>

          <div className="m-3">
            <button type="submit" className="btn btn-block btn-sm">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
