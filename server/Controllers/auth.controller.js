const User = require("../Models/user.model.js");
const bcrypt = require("bcrypt");
const generateToken = require("../Utils/utils.js");

const signUp = async (req, res) => {
  const { ownerName, email, password, shopName, phone } = req.body;

  try {
    if (!ownerName || !email || !password || !shopName || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be 6 character long" });
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      ownername: ownerName,
      shopname: shopName,
      email,
      phone,
      password: hashedPassword,
    });

    generateToken(user._id, res);

    await user.save();

    res.status(201).json({
      _id: user._id,
      ownerName: user.ownername,
      shoapName: user.shopname,
      email: user.email,
      phone: user.phone,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be 6 characters long" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const token = generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      ownerName: user.ownername,
      shoapName: user.shopname,
      email: user.email,
      phone: user.phone,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const signOut = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Loged Out Successsfully" });
  } catch (erro) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const checkAuth = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { signUp, signIn, signOut, checkAuth};
