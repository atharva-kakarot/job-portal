import {User} from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
        return res.status(400).json({
            message: "Something is missing",
            success: false
        });
    }
    const user = await User.findOne({email});
    if (user) {
        return res.status(400).json({
            message: "The user already exists with that email!",
            success: false
        });
    }
  } catch (error) {}
};
