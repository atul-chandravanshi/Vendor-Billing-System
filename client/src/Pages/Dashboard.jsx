import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  FileText,
  DollarSign,
  Package,
  TrendingUp,
  Calendar,
} from "lucide-react";
import Navbar from "../Components/Navbar";

const DashboardCard = ({ item, icon: Icon, gradient }) => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const titles = {
    monthlyTurnover: "Monthly Turnover",
    totalBills: "Total Bills",
    GSTCollected: "GST Collected",
    totslProduct: "Total Products",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${gradient}`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div className="text-white/80 text-sm font-medium">
            <Calendar className="w-4 h-4 inline mr-1" />
            Dec 2025
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-white/90 text-sm font-medium uppercase tracking-wide">
            {titles[item.title]}
          </p>
          <p className="text-3xl font-bold text-white">
            {item.title === "monthlyTurnover" || item.title === "GSTCollected"
              ? formatNumber(item.number)
              : item.number.toLocaleString("en-IN")}
          </p>
          <div className="flex items-center text-white/80 text-xs">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>+12% from last month</span>
          </div>
        </div>
      </div>

      
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
    </div>
  );
};

const Dashboard = () => {
  const stats = [
    {
      title: "monthlyTurnover",
      number: 45200,
      icon: DollarSign,
      gradient: "bg-gradient-to-br from-purple-600 to-purple-800",
    },
    {
      title: "totalBills",
      number: 128,
      icon: FileText,
      gradient: "bg-gradient-to-br from-pink-600 to-rose-700",
    },
    {
      title: "GSTCollected",
      number: 600,
      icon: TrendingUp,
      gradient: "bg-gradient-to-br from-indigo-600 to-blue-700",
    },
    {
      title: "totslProduct",
      number: 50,
      icon: Package,
      gradient: "bg-gradient-to-br from-violet-600 to-purple-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
       
        <Navbar />
        <div className="h-6 md:h-8"></div>

       
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Welcome Back! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your store today.
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((item, index) => (
            <DashboardCard
              key={index}
              item={item}
              icon={item.icon}
              gradient={item.gradient}
            />
          ))}
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Link
            to="/createbill"
            className="bg-white rounded-2xl shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <ShoppingCart className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">New Sale</h3>
                <p className="text-sm text-gray-500">Create a new bill</p>
              </div>
            </div>
          </Link>

          <Link
            to="/products"
            className="bg-white rounded-2xl shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-pink-100 rounded-xl">
                <Package className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Inventory</h3>
                <p className="text-sm text-gray-500">Manage products</p>
              </div>
            </div>
          </Link>

          <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Reports</h3>
                <p className="text-sm text-gray-500">View analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
