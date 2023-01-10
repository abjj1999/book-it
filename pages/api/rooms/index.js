import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import {AllRooms, NewRoom} from '../../../controllers/roomControllers';

const handler = nc();
dbConnect();

handler.get(AllRooms);
handler.post(NewRoom);

export default handler;

