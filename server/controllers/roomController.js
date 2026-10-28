const Room = require("../models/roomModel");

// @desc    Get all rooms
// @route   GET /api/rooms/getrooms or GET /rooms/getrooms
exports.getrooms = async (req, res) => {
  try {
    const rooms = await Room.find({}).sort({ createdAt: -1 });
    return res.status(200).json(rooms);
  } catch (error) {
    console.error("GetRooms Error:", error);
    return res.status(500).json({ error: error.message, msg: "Failed to fetch rooms" });
  }
};

// @desc    Get single room by ID
// @route   GET /api/rooms/:id
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    return res.status(200).json(room);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc    Add a new room
// @route   POST /api/rooms/addroom or POST /addroom
exports.addroom = async (req, res) => {
  try {
    const { roomNumber, count, rent, type, photos, description } = req.body;

    // Ensure photos is an array
    let photoArray = [];
    if (Array.isArray(photos)) {
      photoArray = photos.filter((p) => typeof p === "string" && p.trim().length > 0);
    } else if (typeof photos === "string" && photos.trim()) {
      photoArray = [photos.trim()];
    }

    // Default fallback image if none provided
    if (photoArray.length === 0) {
      photoArray = [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      ];
    }

    const newRoom = new Room({
      roomNumber: Number(roomNumber),
      count: count ? Number(count) : 1,
      rent: Number(rent),
      type: type || "Delux",
      photos: photoArray,
      description: description || "Comfortable and spacious hotel room.",
      currentbooking: [],
    });

    const savedRoom = await newRoom.save();
    return res.status(200).send(savedRoom);
  } catch (error) {
    console.error("AddRoom Error:", error);
    return res.status(500).send(error);
  }
};

// @desc    Delete a room
// @route   DELETE /api/rooms/deleteroom/:id
exports.deleteroom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ success: false, msg: "Room not found" });
    }
    return res.status(200).json({ success: true, msg: "Room deleted successfully", room });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};
