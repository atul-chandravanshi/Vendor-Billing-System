import { Link } from "react-router-dom";
import { ShoppingCart, CheckCircle, LogIn, UserPlus } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-2/3 w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white flex flex-col justify-center p-10 md:px-16 py-4 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-400 opacity-10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Multi-Vendor POS
            <br />
            <span className="text-purple-200">Billing System</span>
          </h1>

          <p className="text-lg md:text-xl mb-8 text-purple-100 leading-relaxed max-w-xl">
            Manage items, generate bills, and calculate GST easily. Designed for
            shop owners with a simple and fast billing experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-2xl">
            {[
              { text: "Instant GST Calculation" },
              { text: "Multi-Vendor Support" },
              { text: "Real-time Inventory" },
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-base">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <img
              src="https://media.istockphoto.com/id/1651747980/photo/cashier-counting-the-money-for-change-on-desk-when-customer-paying-for-purchases.jpg?s=2048x2048&w=is&k=20&c=vB_VgngCpZTQtJGreutJdX5Xyvq9umlBGmx7doDSe_I="
              alt="POS System Dashboard"
              className="relative rounded-xl shadow-2xl w-full max-w-2xl md:object-top h-80 border-4 border-white border-opacity-20 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      <div className="md:w-1/3 w-full flex flex-col justify-center items-center bg-white p-10 md:p-12 shadow-2xl relative">
        <div className="w-full max-w-md relative z-10">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">
            Get Started
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Sign in to your account or create a new one
          </p>

          <div className="space-y-4">
            <Link
              to="/login"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-3.5 px-6 rounded-xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-lg transform hover:scale-105"
            >
              <LogIn className="w-5 h-5" />
              Login
            </Link>

            <Link
              to="/register"
              className="w-full flex items-center justify-center gap-2 border-2 border-purple-600 text-purple-600 py-3.5 px-6 rounded-xl hover:bg-purple-50 transition-all duration-200 font-semibold text-lg transform hover:scale-105"
            >
              <UserPlus className="w-5 h-5" />
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
