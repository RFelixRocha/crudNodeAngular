
const express = require("express")
const router  = express.Router()
const userRoutes = require("../controllers/UserController");
const multer     = require('multer');
const multerConfig = require('../../config/multer')

router.post("/upload", multer(multerConfig).single('foto'), (req,res) => {

    console.log(req.body)
    console.log(req.params)

    const { key, location:url='' } = req.file;

    if(req.file.Error)
        return res.send({Error:req.file.Error});

    return res.send({
        key,
        url:process.env.STORAGE_TYPE === 'local'?`${process.env.APP_URL}/files/${key}`:url
    });

})

router.post("/", userRoutes.create);

router.put("/:id", userRoutes.update);

router.get("/", userRoutes.findAll);

router.get("/:id", userRoutes.findOne);

router.delete("/:id", userRoutes.delete);

module.exports = router;