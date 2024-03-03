import express from "express";
import { login } from "../controllers/login.js";
import { signin } from "../controllers/signin.js";
import user from "../model/user.js";
import { ObjectId } from "mongoose";
const router = express.Router();
router.post("/login", login);
router.post("/signin", signin);
router.put("/location", async (req, res) => {
  try {
    const { id, lat, lng } = req.body;
    const cur = await user.findById(id);

    if (!cur) {
      return res.status(404).json({ message: "User not found" });
    }

    cur.location.lat = lat;
    cur.location.lng = lng;

    await cur.save();

    res.status(200).json(cur);
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
export default router;
