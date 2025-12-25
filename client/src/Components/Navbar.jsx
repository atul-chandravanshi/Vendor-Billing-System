import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { userContext } from "../Context/Context";
import { ShoppingCart, Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);
  const [open, setOpen] = useState(false);

  
  const handleLogOut = async () => {
    const response = await axios.post(
      "http://localhost:8000/auth/signout",
      {},
      { withCredentials: true }
    );
    toast.success(response.data.message);
    navigate("/");
  };

  return (
    <nav className="bg-white rounded-2xl shadow-md p-4 mb-8">
      <div className="flex justify-between items-center">
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              {user?.shopname || "My Shop"}
            </h2>
            <p className="text-xs text-gray-500">Multi-Vendor POS</p>
          </div>
        </div>

        
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/dashboard" text="Dashboard" />
          <NavLink to="/products" text="Products" />
          <NavLink to="/createbill" text="Create Bill" />

          <button
            onClick={handleLogOut}
            className="px-4 py-2 bg-gradient-to-l cursor-pointer from-pink-300  to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
          >
            Logout
          </button>
        </div>

      
        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <X size={24} className="text-gray-700" />
          ) : (
            <Menu size={24} className="text-gray-700" />
          )}
        </button>
      </div>

    
      {open && (
        <div className="md:hidden mt-4 space-y-2 bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
          <MobileLink to="/dashboard" text="Dashboard" setOpen={setOpen} />
          <MobileLink to="/products" text="Products" setOpen={setOpen} />
          <MobileLink to="/createbill" text="Create Bill" setOpen={setOpen} />

          <button
            onClick={handleLogOut}
            className="w-full bg-gradient-to-r from-red-500   to-red-600 text-white py-2 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};


const NavLink = ({ to, text }) => (
  <Link
    to={to}
    className="text-gray-700 hover:text-purple-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 after:transition-all hover:after:w-full"
  >
    {text}
  </Link>
);


const MobileLink = ({ to, text, setOpen }) => (
  <Link
    to={to}
    onClick={() => setOpen(false)}
    className="block text-gray-700 font-medium hover:text-purple-600 hover:bg-white px-4 py-3 rounded-lg transition-all"
  >
    {text}
  </Link>
);

export default Navbar;
