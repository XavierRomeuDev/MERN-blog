const express = require('express');
const controller = require('../controllers/article');
const multer = require('multer');

const router = express.Router();
const storages = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './images/articles/');
    }, 

    filename: function(req, file, cb){
        cb(null, "article" + Date.now() + file.originalname);
    }, 
});

const uploads = multer({storage: storages});

//GET routes
router.get("/articles/:limit?", controller.listArticles);
router.get("/article/:id", controller.detailArticle);
router.get("/image/:file", controller.image);
router.get("/search/:text", controller.searchArticle);

//POST routes
router.post("/create", controller.createArticle);
router.post("/upload/:id", [uploads.single("file")],  controller.uploadFile);


//DELETE routes
router.delete("/article/:id", controller.deleteArticle);

//PUT routes
router.put("/article/:id", controller.editArticle);


module.exports = router;