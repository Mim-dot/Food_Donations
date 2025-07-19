import { Link, NavLink } from "react-router";
import { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../LayOut/AuthContext";

const Nav = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await logOut();
      setIsOpen(false); // close menu on logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white text-[#7B4F28] shadow-md fixed top-0 left-0 w-full h-15 z-50 font-[Comfortaa]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and Site Name */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-2xl font-bold select-none"
          onClick={() => setIsOpen(false)}
        >
          <img
            src="https://i.ibb.co/Hphmv4Y0/Share-Bite.png" // add your logo path here
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
          ShareBite
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center text-md font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-[#D4A373]" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "text-[#D4A373]" : "")}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "text-[#D4A373]" : "")}
          >
            Contact
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/alldonations"
                className={({ isActive }) =>
                  isActive ? "text-[#D4A373]" : ""
                }
              >
                All Donations
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-[#D4A373]" : ""
                }
              >
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="hover:text-[#D4A373] transition"
              >
                LogOut
              </button>
            </>
          ) : (
            <NavLink
              to="/auth/login"
              className={({ isActive }) => (isActive ? "text-[#D4A373]" : "")}
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu + Light Overlay */}
      {isOpen && (
        <>
          {/* Light Overlay */}
          <div
            onClick={toggleMenu}
            className="fixed inset-0  backdrop-blur-sm z-40"
          />

          {/* Dropdown Panel */}
          <div
            className="md:hidden fixed top-[64px] right-4 bg-[#FAF3E0] z-50 shadow-lg border border-[#D4A373] rounded-lg w-48 max-h-56 overflow-y-auto p-2 space-y-1"
            style={{ scrollbarWidth: "thin" }}
          >
            <NavLink
              to="/"
              onClick={toggleMenu}
              className="block px-3 py-2 rounded hover:bg-[#D4A373] hover:text-white transition"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={toggleMenu}
              className="block px-3 py-2 rounded hover:bg-[#D4A373] hover:text-white transition"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              onClick={toggleMenu}
              className="block px-3 py-2 rounded hover:bg-[#D4A373] hover:text-white transition"
            >
              Contact
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to="/alldonations"
                  onClick={toggleMenu}
                  className="block px-3 py-2 rounded hover:bg-[#D4A373] hover:text-white transition"
                >
                  All Donations
                </NavLink>
                <NavLink
                  to="/dashboard"
                  onClick={toggleMenu}
                  className="block px-3 py-2 rounded hover:bg-[#D4A373] hover:text-white transition"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded hover:bg-[#D4A373] hover:text-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/auth/login"
                onClick={toggleMenu}
                className="block px-3 py-2 rounded hover:bg-[#D4A373] hover:text-white transition"
              >
                Login
              </NavLink>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
