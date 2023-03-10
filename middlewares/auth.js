import catchAsyncErrors from './catchAsyncErrors'
import ErrorHandler from '../utils/errorHandler'
import {getSession} from 'next-auth/react'

// Checks if user is authenticated or not
 const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    // getsession is a function from next-auth that gets auth-token from req.headers
    const session  = await getSession({req});
    if(!session){
        return next(new ErrorHandler('Login first to access this resource.', 401))
    }
    req.user = session.user;
    // console.log(session);
    next();
})

export { isAuthenticatedUser }