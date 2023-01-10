import Room from "../models/Room.js";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

const AllRooms = catchAsyncErrors(async (req, res) => {
  const rooms = await Room.find();

  res.status(200).json({
    success: true,
    count: rooms.length,
    message: rooms,
  });
});

// Create new room => /api/room
const NewRoom = catchAsyncErrors(async (req, res) => {
  const room = await Room.create(req.body);
  res.status(201).json({
    success: true,

    room,
  });
});

// Get single room details => /api/room/:id
const getSingleRoom = catchAsyncErrors(async (req, res, next) => {

  const room = await Room.findById(req.query.id);

  if (!room) {
      return next(new ErrorHandler('Room not found with this ID', 404))
  }

  res.status(200).json({
      success: true,
      room
  })
})

// Update room => /api/room/:id
const updateRoom = catchAsyncErrors(async (req, res) => {
  let room = await Room.findOneAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!room) {
    return next(new ErrorHandler("Room not found", 404));
  }
  res.status(200).json({
    success: true,
    room,
  });
});

// Delete room => /api/room/:id
// delete image form cloudinary after intergration with cloudinary
const deleteRoom = catchAsyncErrors(async (req, res) => {
  const room = await Room.findByIdAndDelete(req.query.id);
  if (!room) {
    return next(new ErrorHandler({message: "Room not found", statusCode: 404}));
  }
  res.status(200).json({
    success: true,
    message: "Room is deleted",
  });
});

export { AllRooms, NewRoom, getSingleRoom, updateRoom, deleteRoom };
