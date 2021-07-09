
const express = require("express")
const router  = express.Router()
const userRoutes = require("../controllers/UserController");
const multer     = require('multer');
const multerConfig = require('../../config/multer')

router.post("/upload", multer(multerConfig).single('foto'), (req,res) => {

    if(req.file.Error)
        return res.send({Error:req.file.Error});

    return res.send({
        name_foto:req.file.filename,
        path_foto:req.file.path
    });

})

router.post("/", userRoutes.create);

router.put("/:id", userRoutes.update);

router.get("/", userRoutes.findAll);

router.get("/:id", userRoutes.findOne);

router.delete("/:id", userRoutes.delete);

module.exports = router;