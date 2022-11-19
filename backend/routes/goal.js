var router = require("express").Router();
const {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalsCtrl.js");
const { protect } = require("../middleware/authMiddle");

router.get("/", protect, getGoals);
router.post("/", protect, setGoals);
router.patch("/:id", protect, updateGoals);
router.delete("/:id", protect, deleteGoals);

module.exports = router;
