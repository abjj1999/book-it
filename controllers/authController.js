import User from "../models/User.js";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import cloudinary from "cloudinary";
import absoluteUrl from "next-absolute-url";
import sendEmail from "../utils/sendEmail";
import crypto from "crypto";


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

// forgot password => /api/password/forgot
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if(!user) {
        return next(new ErrorHandler("User not found with this email", 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Get origin
    const { origin } = absoluteUrl(req);

    // Create reset password url
    const resetUrl = `${origin}/password/reset/${resetToken}`;
    
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\n
    If you have not requested this email, then ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: "BookIT Password Recovery",
            message: message,
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }

    res.status(200).json({
        success: true,
        message: `Email sent to: ${user.email}`
    });
})

// reset password => /api/password/reset/:token
const resetPassword = catchAsyncErrors(async (req, res, next) => {
    // Hash url token
    
    const resetPasswordToken = crypto.createHash('sha256').update(req.query.token).digest('hex');

    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

    if(!user) {
        return next(new ErrorHandler("Password reset token is invalid or has been expired", 400));
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Password updated successfully"
    })
})

export { registerUser, currentUserProfile, updateProfile, forgotPassword, resetPassword };


