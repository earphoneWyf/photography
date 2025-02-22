const express = require("express");
const router = express.Router();
const {
  getAllShootingDemands,
  getShootingDemandById,
  updateShootingDemand,
  publishShootingDemand,
  getShootingDemandsByUserId 
} = require("../router_handler/shooting");

router.get("/demands", getAllShootingDemands);
router.get("/demands/:id", getShootingDemandById);
router.put("/demands/:id", updateShootingDemand);
router.post("/demands", publishShootingDemand);
router.get('/demands/user/:userId', getShootingDemandsByUserId); 

module.exports = router;
