import { NavLink } from "react-router";
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
    <nav className="bg-white dark:bg-gray-900 text-[#7B4F28] dark:text-white shadow-md fixed top-0 left-0 w-full z-50 font-[Comfortaa]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and Site Name */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-2xl font-bold select-none"
          onClick={() => setIsOpen(false)}
        >
          <img
            src="https://i.ibb.co/Hphmv4Y0/Share-Bite.png"
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
          ShareBite
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center text-md font-semibold">
          <NavLink to="/" className={({ isActive }) => (isActive ? "text-[#D4A373]" : "")}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "text-[#D4A373]" : "")}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "text-[#D4A373]" : "")}>
            Contact
          </NavLink>

          {user ? (
            <>
              <NavLink to="/alldonations" className={({ isActive }) => (isActive ? "text-[#D4A373]" : "")}>
                All Donations
              </NavLink>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "text-[#D4A373]" : "")}>
                Dashboard
              </NavLink>

              {/* Avatar dropdown */}
              <details className="dropdown dropdown-bottom dropdown-end">
                <summary className="m-0 list-none cursor-pointer flex items-center gap-2">
                  <img
                    className="w-8 h-8 rounded-full ring ring-[#D4A373]"
                    src={user.photoURL || "https://i.ibb.co/yYW5P8g/default-avatar.png"}
                    alt="User"
                  />
                </summary>
                <ul className="menu dropdown-content mt-3 z-50 bg-base-100 dark:bg-gray-800 rounded-box w-52 p-2 shadow-lg">
                  <li className="text-sm px-2 py-1 font-semibold text-black dark:text-white">
                    👤 {user.displayName || "User"}
                  </li>
                  <li className="text-sm px-2 py-1 text-black dark:text-white">
                    📧 {user.email}
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-orange-500 font-medium hover:underline w-full text-left px-2 py-1"
                    >
                      🚪 Log Out
                    </button>
                  </li>
                </ul>
              </details>
            </>
          ) : (
            <NavLink to="/auth/login" className={({ isActive }) => (isActive ? "text-[#D4A373]" : "")}>
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

      {/* Mobile Dropdown Menu + Overlay */}
      {isOpen && (
        <>
          <div onClick={toggleMenu} className="fixed inset-0 backdrop-blur-sm z-40" />
          <div className="md:hidden fixed top-[64px] right-4 bg-[#FAF3E0] dark:bg-gray-800 z-50 shadow-lg border border-[#D4A373] rounded-lg w-48 max-h-60 overflow-y-auto p-2 space-y-1">
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
                <div className="border-t border-gray-300 my-1"></div>
                <div className="px-3 py-1 text-sm text-black dark:text-white font-semibold">
                  👤 {user.displayName || "User"}
                </div>
                <div className="px-3 py-1 text-xs text-gray-600 dark:text-gray-300">
                  📧 {user.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 mt-1 rounded hover:bg-[#D4A373] hover:text-white transition"
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
