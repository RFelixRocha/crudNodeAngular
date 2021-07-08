
const express = require("express")
const router  = express.Router()
const userRoutes = require("../controllers/UserController");

router.post("/", userRoutes.create);

router.put("/:id", userRoutes.update);

router.get("/", userRoutes.findAll);

router.get("/:id", userRoutes.findOne);

router.delete("/:id", userRoutes.delete);

module.exports = router;