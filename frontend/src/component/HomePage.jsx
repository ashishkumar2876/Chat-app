import React,{useEffect} from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const HomePage = () => {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);
  return (
    <div className='flex lg:h-[500px] sm:h-[450px] md:h-[550px] h-[350px] rounded-lg overflow-hidden bg-gray-100 p-2 shadow-md '>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default HomePage