import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import {getBookingDetails} from '../../../controllers/bookingControllers';
import onError from '../../../middlewares/errors';
import { isAuthenticatedUser } from '../../../middlewares/auth';
const handler = nc({onError});
dbConnect();

handler
.use(isAuthenticatedUser)
.get(getBookingDetails);

export default handler;