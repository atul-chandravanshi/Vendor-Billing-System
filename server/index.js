const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookeiparser = require("cookie-parser");
const connectDB = require("./Connection/connectDB.js");
const authRoutes = require("./Routes/user.Auth.js")
const productRoutes = require("./Routes/product.Auth.js");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookeiparser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/product", productRoutes);

app.listen(process.env.PORT, () => {
    console.log("server is running");
    connectDB();
})