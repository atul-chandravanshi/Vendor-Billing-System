import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import Dashboard from '../Pages/Dashboard'
import Products from "../Pages/Products";
import CreateBill from "../Pages/Createbill";


const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/createbill" element={<CreateBill />} />
    </Routes>
  );
};

export default Routing;
