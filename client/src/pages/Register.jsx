import { useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";

export default function Register() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleInputChange = (e) => {
    const { id, value } = e.target
    if (id === 'confirmPassword') {
      setConfirmPassword(value)
    }
    else {
      setUserData((prevData) => ({
        ...prevData,
        [id]: value
      }))
    }
  };

  const registerUser = async (e) => {
    e.preventDefault()
    const { name, email, password } = userData

    // Check Password Match
    if (password != confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    
    try {
      const { data } = await axios.post('/register', {
        name, email, password
      })

      if (data.error) {
        toast.error(data.error)
      }
      else {
        setUserData({})
        setConfirmPassword('')
        toast.success('Account created successfully')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="py-20 flex justify-center">
      <AuthCard
        title="Create an Account"
        description="Sign up with your details below"
        buttonText="Register"
        fields={[
          {
            id: "name",
            label: "Name",
            type: "text",
            placeholder: "Name",
            required: true,
            value: userData.name,
            onChange: handleInputChange
          },
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
          {
            id: "confirmPassword",
            label: "Retype Password",
            type: "password",
            required: true,
            value: confirmPassword,
            onChange: handleInputChange
          },
        ]}
        footerButtons={
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover:text-gray-300 cursor-pointer"
            onClick={registerUser}
          >
            Register
          </button>
        }
      />
    </div>
  )
}
