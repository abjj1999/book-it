import User from "../models/User.js";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import cloudinary from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
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
        
        
    });

});

// current user profile => /api/me
const currentUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    })
})

// update user profile => /api/me/update
const updateProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if(user) {
        user.name = req.body.name;
        user.email = req.body.email;
        if(req.body.password) {
            user.password = req.body.password;
        }
    }

    if(req.body.avatar !== '') {
        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'bookIt/avatars',
            width: '150',
            crop: 'scale'
        })

        user.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    await user.save();

    res.status(200).json({
        success: true,
        message: "Profile updated successfully"
    })

})

export { registerUser, currentUserProfile, updateProfile };


