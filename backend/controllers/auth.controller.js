import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcrypt";


export const signup = async (req, res) => {
  try {
    const { email, password, adminName, confirmPassword } = req.body;
    console.log(email, password, adminName, confirmPassword);
    if (!email || !password || !adminName || !confirmPassword) {
      return res
        .status(400)
        .json({ error: "All Fields must be filled!", success: false });
    }

    // check whether the email exists in databse or not
    const emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Invalid Email Format", success: false });
    }

    const isExistingEmail = await User.findOne({ email });
    if (isExistingEmail) {
      return res
        .status(400)
        .json({ error: "Email Already Existed", success: false });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: "password can't be less than 8 characters",
        success: false,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "Password doesn't match with Confirm Password",
        success: false,
      });
    }

     // hasing the password with salt
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      email,
      adminName,
      password:hashedPassword,
    });
    if (newUser) {
      generateToken(newUser._id, email, res);
      newUser.save();

      return res.status(201).json({
        user: {
          _id: newUser._id,
          adminName:newUser.adminName,
          email: newUser.email,
        },
        success: true,
        message: "Account created successfully.",
      });
    } else {
      res.status(400).json({ error: "Invalid User data", success: false });
    }
  } catch (error) {
    console.log(`Error at Singup Controller ${error}`);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

// ==================================== LOGIN =========================================================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All Fields must be filled!", success: false });
    }

    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Invalid Email or Password", success: false });
    }

    generateToken(user._id, email, res);
    res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        adminName: user.adminName
      },
      success: true,
      message: "Login Successful",
    });
  } catch (error) {
    console.log(`Error at Login Controller ${error}`);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// ============================================= Logout ===========================================
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out Successfully", success: true });
  } catch (error) {
    console.log(`Error at Logout Controller : ${error.message}`);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};


// ======================================= IsLoggedIn ===================================
export const isLoggedIn = async (req, res) => {
  try {
    const token = req.cookies.jwt
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized, No Token Provided", success: false });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    if (!decode) {
      return res
        .status(401)
        .json({ error: "Unauthorized, Invalid Token", success: false });
    }
    const user = await User.findById(decode.adminId).select("-password")

    if (!user) {
      return res
        .status(401)
        .json({ error: "User Not Found", success: false });
    }
    res.status(200).json({success:true,message:"user already loggedIn."})
  } catch (error) {
    console.log(`Error at Login Controller ${error}`);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};