import { NavLink, useNavigate } from "react-router-dom";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { FaHome } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import "./Navbar.scss";
import { useAuth } from "../../context/AuthContext";
import Search from "../../sreach/Search";
import About from "../About/About";
import MyCards from "../../routes/MyCards";

export const Navbar = () => {

  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="site-navbar">
      <div className="nav-left">
        <NavLink to="/" className="brand">
          Home<FaHome />
        </NavLink>

      </div>

      <div className="nav-right">
        {!isLoggedIn && <NavLink to="/register">Register</NavLink>}
        {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
        {isLoggedIn && <NavLink to="/about">About</NavLink>}
        {isLoggedIn && <NavLink to="/createCard">Create a card</NavLink>}
        {isLoggedIn && <NavLink to="/my-cards"> My card</NavLink>}
        {isLoggedIn && <NavLink to="/favoriteCard"> Favorite card</NavLink>}
        {isLoggedIn && (
          <button className="logout-btn flex"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >Logout</button>
        )}
        {isLoggedIn && <NavLink to="/profile" className={"profile-button mt-1"}><RxAvatar /></NavLink>}
        <DarkModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;