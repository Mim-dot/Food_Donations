import { Link, NavLink } from "react-router"; 
import { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../LayOut/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext); 
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white text-[#7B4F28] shadow-md fixed top-0 left-0 w-full z-50 font-[Comfortaa]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo and Website Name */}
        <NavLink to="/" className="flex items-center gap-2 text-2xl font-bold">
          <img src="" alt="Logo" className="w-8 h-8" />
          FoodHelp
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center text-md font-semibold">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-[#D4A373] " : ""}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-[#D4A373]" : ""}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-[#D4A373]" : ""}>Contact</NavLink>

          {user && (
            <>
              <NavLink to="/alldonations" className={({ isActive }) => isActive ? "text-[#D4A373]" : ""}>All Donations</NavLink>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-[#D4A373]" : ""}>Dashboard</NavLink>
              <button onClick={handleLogout} className="hover:text-[#D4A373]">LogOut</button>
            </>
          )}

          {!user && (
            <NavLink to="/auth/login" className={({ isActive }) => isActive ? "text-[#D4A373]" : ""}>Login</NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2 bg-white text-[#7B4F28]">
          <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/about" onClick={toggleMenu}>About</NavLink>
          <NavLink to="/contact" onClick={toggleMenu}>Contact</NavLink>

          {user && (
            <>
              <NavLink to="/alldonations" onClick={toggleMenu}>All Donations</NavLink>
              <NavLink to="/dashboard" onClick={toggleMenu}>Dashboard</NavLink>
              <button onClick={() => { handleLogout(); toggleMenu(); }}>Logout</button>
            </>
          )}
          {!user && <NavLink to="/auth/login" onClick={toggleMenu}>Login</NavLink>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
