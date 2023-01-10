import Room from "../models/Room.js";
import ErrorHandler from "../utils/errorHandler";

const AllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
    
      res.status(200).json({
        success: true,
        count: rooms.length,
        message: rooms,
      });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// Create new room => /api/room
const NewRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json({
      success: true,
      
      room,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get single room details => /api/room/:id
const getSingleRoom = async (req, res, next) => {
  
    //in next js we use req.query.id instead of req.params.id that we use in express
    const room = await Room.findById(req.query.id);
    if(!room){
      return next(new ErrorHandler('Room not found', 404));
    }
    res.status(200).json({
      success: true,
      room
    })
 
}

// Update room => /api/room/:id
const updateRoom = async (req, res, next) => {
  
    let room = await Room.findOneAndUpdate(
      req.query.id,
      req.body,
      { new : true,
        runValidators: true,
        useFindAndModify: false
      }
    )
    if(!room){
      return next(new ErrorHandler('Room not found', 404));
    }
    res.status(200).json({
      success: true,
      room
    })
  
}

// Delete room => /api/room/:id
// delete image form cloudinary after intergration with cloudinary
const deleteRoom = async (req, res, next) => {
  
    const room = await Room.findByIdAndDelete(req.query.id);
    if(!room){
      return next(new ErrorHandler('Room not found', 404));
    }
    res.status(200).json({
      success: true,
      message: 'Room is deleted'
    })
  
}

export { AllRooms, NewRoom, getSingleRoom, updateRoom, deleteRoom };
