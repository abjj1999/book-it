import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import {AllRooms, NewRoom} from '../../../controllers/roomControllers';
import onError from '../../../middlewares/errors';
const handler = nc({onError});
dbConnect();

handler.get(AllRooms);
handler.post(NewRoom);

export default handler;

