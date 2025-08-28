import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function Navbar() {
  const { user } = useContext(UserContext);
  
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between fixed w-full top-0 left-0">
      <Link to='/' className="font-bold text-xl hover:text-blue-400"> Home </Link>
      { !user ? (
        <>
          <Link to='/register' className="font-bold text-xl hover:text-blue-400"> Register </Link>
          <Link to='/login' className="font-bold text-xl hover:text-blue-400"> Login </Link>
        </>
      ) : (
      <Logout />
      )}
    </nav>
  )
}
