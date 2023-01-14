import User from "../models/User.js";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

// Get all rooms => /api/auth/register
const registerUser = catchAsyncErrors(async (req, res) => {
  const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password, avatar: {
            public_id: "PUBLIC_ID",
            url: "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
        }
    });
    res.status(200).json({
        success: true,
        message: "User created successfully",
        
    });

});

export { registerUser };


