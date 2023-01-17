import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import {updateProfile} from '../../../controllers/authController';
import onError from '../../../middlewares/errors';
import { isAuthenticatedUser } from '../../../middlewares/auth';
const handler = nc({onError});
dbConnect();

handler.use(isAuthenticatedUser).put(updateProfile);

export default handler;

