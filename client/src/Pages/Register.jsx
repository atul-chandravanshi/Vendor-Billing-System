import { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../Context/Context";
import {
  ShoppingCart,
  Store,
  User,
  Mail,
  Phone,
  Lock,
  CheckCircle,
} from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    shopName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.ownerName) {
      toast("⚠️ Owner Name is required");
      return;
    } else if (!formData.shopName) {
      toast("⚠️ Shopname is required");
      return;
    } else if (!formData.email) {
      toast("⚠️ Email is required");
      return;
    } else if (!formData.phone) {
      toast("⚠️ Phone number is required");
      return;
    } else if (!formData.password) {
      toast("⚠️ Password is required");
      return;
    } else if (formData.password !== formData.confirmPassword) {
      toast("⚠️ Password and Confirm Password must be same");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/signup",
        formData,
        { withCredentials: true }
      );
      setUser(response.data);
      navigate("/dashboard");
      toast.success("User Registered Successfully ");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-12 items-center justify-center relative overflow-hidden">
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-200 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-white max-w-md">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 border border-white/30">
              <ShoppingCart className="w-10 h-10" />
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
            Start Selling Today
          </h1>
          <p className="text-xl text-purple-100 mb-12 leading-relaxed">
            Join thousands of successful vendors and grow your business on our
            platform.
          </p>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-all">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-lg font-semibold text-white">
                  Free account setup
                </span>
                <p className="text-sm text-purple-200">
                  Get started in minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
     
          <div className="lg:hidden text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-3 shadow-lg">
              <ShoppingCart className="w-7 h-7 text-white" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100">
            <div className="text-center mb-5">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Create Vendor Account
              </h2>
            </div>

            <div className="space-y-3">
             
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Owner Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="ownerName"
                    placeholder="Full Name"
                    value={formData.ownerName}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none hover:border-gray-300"
                    onChange={handleChange}
                  />
                </div>
              </div>

              
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Shop Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Store className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="shopName"
                    placeholder="Your Shop Name"
                    value={formData.shopName}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none hover:border-gray-300"
                    onChange={handleChange}
                  />
                </div>
              </div>

              
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none hover:border-gray-300"
                    onChange={handleChange}
                  />
                </div>
              </div>

              
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 1234567890"
                    value={formData.phone}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none hover:border-gray-300"
                    onChange={handleChange}
                  />
                </div>
              </div>

             
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none hover:border-gray-300"
                    onChange={handleChange}
                  />
                </div>
              </div>

              
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CheckCircle className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none hover:border-gray-300"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-xl mt-4"
              >
                Create Account
              </button>
            </div>

            
            <p className="mt-4 text-center text-xs text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-all"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
