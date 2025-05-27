import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setUser(null);
        navigate("/");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const baseStyle = "hover:text-blue-500";
  const activeStyle = "underline underline-offset-6 decoration-blue-300";

  return (
    <nav className="flex items-center justify-between px-6 lg:px-8 py-4 bg-white shadow ">
      {/* Logo */}
      <NavLink to="/" className="text-2xl lg:text-3xl font-bold text-blue-600">
        FileKeep
      </NavLink>

      {/* Nav Links */}
      <div className="space-x-2 sm:space-x-4 text-sm sm:text-lg lg:text-xl text-gray-700">
        <NavLink
          to="/folders"
          // Add base style, if not active, do not apply active style
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : ""}`
          }
        >
          Folders
        </NavLink>

        <NavLink
          to="/files"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : ""}`
          }
        >
          Files
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : ""}`
          }
        >
          About
        </NavLink>

        {user && (
          <button
            onClick={handleLogout}
            className="text-red-600 pl-1 lg:px-2 rounded cursor-pointer hover:text-red-950 transition"
          >
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
}
