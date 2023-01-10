import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import {AllRooms} from '../../../controllers/roomControllers';

const handler = nc();
dbConnect();

handler.get(AllRooms);

export default handler;

