const mongoose = require("mongoose");


const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter room name"],
        trim: true,
        maxlength: [50, "Room name cannot exceed 50 characters"],
    },
    pricePerNight: {
        type: Number,
        required: [true, "Please enter room price"],
        maxlength: [4, "Room price cannot exceed 4 characters"],
        default: 0.0,
    },
    description: {
        type: String,
        required: [true, "Please enter room description"],
    },
    address: {
        type: String,
        required: [true, "Please enter room address"],
    },
    guestCapacity: {
        type: Number,
        required: [true, "Please enter room guest capacity"],
        default: 0,
    },
    numOfBeds: {
        type: Number,
        required: [true, "Please enter number of beds"],
        default: 1,
    },
    internet: {
        type: Boolean,
        default: false,
    },
    breakfast: {
        type: Boolean,
        default: false,
    },
    airConditioned: {
        type: Boolean,
        default: false,
    },
    petsAllowed: {
        type: Boolean,
        default: false,
    },
    roomCleaning: {
        type: Boolean,
        default: false,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please select room category"],
        enum: {
            values: [
                "King",
                "Single",
                "Twins",
                "Double",
                "Queen",
            ],
            message: "Please select correct category for room",
        }
    },
    reviews: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        }
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        // required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

},{
    timestamps: true,
});


module.exports= mongoose.models.Room || mongoose.model("Room", RoomSchema);