

const AllRooms = async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'All Rooms'
    })
}

export {
    AllRooms
}