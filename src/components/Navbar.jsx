import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import UserImg from "../img/m2.jpg";

const Navbar = ({ userData }) => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  const imageSrc = userData?.file_name || UserImg;
  const display_name = userData?.display_name || session?.user?.email;

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar">
      <span className="logo">ChatBrew</span>
      <div className="user">
        <button onClick={handleSignOut}>Logout</button>
        <span>{display_name}</span>
        <img src={imageSrc} alt={display_name || "User"} />
      </div>
    </div>
  );
};

export default Navbar;
