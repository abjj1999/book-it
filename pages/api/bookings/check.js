import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import {checkRoomBooking} from '../../../controllers/bookingControllers';
import onError from '../../../middlewares/errors';

const handler = nc({onError});
dbConnect();

handler
.get(checkRoomBooking);

export default handler;