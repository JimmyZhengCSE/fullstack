import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Logout() {
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate();

    const logoutUser = async() => {
        await axios.post('/logout');
        setUser(null);
        navigate('/');
    }
    return (
        <div>
            <button
                className="font-bold text-xl hover:text-blue-400 cursor-pointer" 
                onClick={logoutUser}> Logout </button>
        </div>
    )
}
