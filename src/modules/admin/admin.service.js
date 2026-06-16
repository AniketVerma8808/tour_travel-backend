import Admin from "./admin.model.js";
import { generateToken } from "../../utils/jwt.js";

const login = async ({ email, password }) => {
  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) {
    return {
      success: false,
      statusCode: 401,
      message: "Invalid credentials",
    };
  }

  const isMatch = await admin.matchPassword(password);

  if (!isMatch) {
    return {
      success: false,
      statusCode: 401,
      message: "Invalid credentials",
    };
  }

  const token = generateToken({
  id: admin._id,
  email: admin.email,
});

  return {
    success: true,
    statusCode: 200,
    message: "Login successful",
    token,
    admin: {
      id: admin._id,
      email: admin.email,
      name: admin.name,
    },
  };
};

export default {
  login,
};