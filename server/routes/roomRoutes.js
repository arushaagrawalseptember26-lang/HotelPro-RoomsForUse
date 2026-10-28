const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

router.get("/getrooms", roomController.getrooms);
router.get("/:id", roomController.getRoomById);
router.post("/addroom", roomController.addroom);
router.delete("/deleteroom/:id", roomController.deleteroom);

module.exports = router;
