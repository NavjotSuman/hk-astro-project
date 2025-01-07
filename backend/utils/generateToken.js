import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

configDotenv()


export const generateToken = (adminId, email, res) => {
  const token = jwt.sign({ email, adminId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  console.log("token : ",token);
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //MilliSeconds
    // secure:false,
    httponly: true, // prevent XSS attack cross-site scripting attacks
    sameSite: "strict", //CSRF attack cross-site request forgery attacks
  });
};
