import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import AuthCard from "../components/AuthCard";

export default function Login() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })
  const { setUser } = useContext(UserContext)

  const handleInputChange = (e) => {
    const { id, value } = e.target

    setUserData((prevData) => ({
      ...prevData,
      [id]: value
    }))
    
  };

  const loginUser = async (e) => {
    e.preventDefault()

    const { email, password } = userData
    try {
      const { data } = await axios.post('/login', {
        email, password
      });
      
      if (data.error) {
        toast.error(data.error)
      }
      else {
        setUser(data)
        setUserData({})
        toast.success("Success!")
        navigate('/profile')
      }

    } catch (error) {
      console.log(error)
    }
  } 

  return (
    <div className="py-25 flex justify-center">
      <AuthCard
        title="Log In"
        description="Enter account details to login"
        buttonText="Log In"
        fields={[
          {
            id: "email",
            label: "Email",
            type: "email",
            placeholder: "Email",
            required: true,
            value: userData.email,
            onChange: handleInputChange
          },
          {
            id: "password",
            label: "Password",
            type: "password",
            required: true,
            value: userData.password,
            onChange: handleInputChange
          },
        ]}
        footerButtons={
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover:text-gray-300 cursor-pointer"
            onClick={loginUser}
          >
            Log In
          </button>
        }
      />
    </div>
  )
}
