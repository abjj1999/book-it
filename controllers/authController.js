import User from "../models/User.js";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import cloudinary from "cloudinary";


cloudinary.config({
    cloud_name: "",
    api_key: "",
    api_secret: ""
})

// Get all rooms => /api/auth/register
const registerUser = catchAsyncErrors(async (req, res) => {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'bookIt/avatars',
        width: '150',
        crop: 'scale'
    })

  const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password, avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    });
    res.status(200).json({
        success: true,
        message: "User created successfully",
        user
        
    });

});

export { registerUser };


