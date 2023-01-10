import Room from "../models/Room.js";

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

export { AllRooms, NewRoom };
