const { validateArticle } = require('../helpers/validate');
const fs = require("fs");
const path = require("path");
const Article = require('../models/Article');

const createArticle = (req, res) =>{

    let params = req.body;

    try{
        validateArticle(params);
    }catch(err){
        return res.status(400).json({
            status: "error",
            message: "Cannot create article"
        });
    }
    
    const article = new Article(params);
    article.save((err, savedArticle) => {
        if(err || !savedArticle){
            return res.status(400).json({
                status: "error",
                message: "Cannot create article"
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "Article created succesfully",
            savedArticle
        });
    });
}

const listArticles = (req, res) =>{

    let query = Article.find({});
    
    if(req.params.limit && !isNaN(req.params.limit)){
        query.limit(req.params.limit);
    }

    query.sort({date: -1}).exec((err, articles) => {
        if(err || !articles){
            return res.status(404).json({
                status: "error",
                message: "Cannot find any article"
            });
        }

        return res.status(200).send({
            status: "success",
            articles
        });
    });
}

const detailArticle = (req, res) => {

    let articleId = req.params.id;

    Article.findById(articleId, (err, articleDetail) => {
        if(err || !articleDetail){
            return res.status(404).json({
                status: "error",
                message: "Cannot find the article"
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "Article details listed succesfully",
            articleDetail
        });
    });
}

const deleteArticle = (req, res) => {

    let articleId = req.params.id;

    Article.findByIdAndDelete(articleId, (err, articleDelete) => {
        if(err || !articleDelete){
            return res.status(500).json({
                status: "error",
                message: "Cannot delete the article or article not found"
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "Article deleted succesfully",
            articleDelete
        });
    });
}

const editArticle = (req, res) => {

    let articleId = req.params.id;

    let params = req.body;

    try{
        validateArticle(params);
    }catch(err){
        return res.status(400).json({
            status: "error",
            message: "Cannot update article"
        });
    }

    Article.findByIdAndUpdate(articleId, req.body, {new: true}, (err, articleUpdated) => {
        if(err || !articleUpdated){
            return res.status(500).json({
                status: "error",
                message: "Cannot update the article or article not found"
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "Article updated succesfully",
            article: articleUpdated
        });
    });
}

const uploadFile = (req, res) => {

    if(!req.file && !req.files){
        return res.status(404).json({
            status: "error",
            message: "no file attached"
        });
    }
    
    let file = req.file.originalname;
    let file_split = file.split("\.");
    let extension = file_split[1];

    if(extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "gif" && extension != "webp"){
        //delete distinc files
        fs.unlink(req.file.path, (error) => {
            return res.status(400).json({
                status: "error",
                message: "invalid file type"
            });
        });

    }else{
        let articleId = req.params.id;
       
        Article.findByIdAndUpdate(articleId, { image: req.file.filename }, {new: true}, (err, articleUpdated) => {
            if(err || !articleUpdated){
                return res.status(500).json({
                    status: "error",
                    message: "Cannot update the article or article not found"
                });
            }
    
            return res.status(200).json({
                status: "Success",
                message: "Article updated succesfully",
                article: articleUpdated,
                file: req.file
            });
        });
    }    
}

const image = (req, res) => {

    let file = req.params.file;
    let file_path = "./images/articles/" + file;

    fs.stat(file_path, (err, exists) => {
        if(exists){
            return res.sendFile(path.resolve(file_path));
        } else{
            return res.status(404).json({
                status: "error",
                message: "file not found"
            }); 
        }
    });
}

const searchArticle = (req, res) => {

    let find = req.params.text;
    Article.find({"$or": [
        {"title": {"$regex": find, "$options": "i"}},
        {"content": {"$regex": find, "$options": "i"}},
    ]})
    .sort({date: -1})
    .exec((error, articlesFound) => {

       if(error || !articlesFound || articlesFound.length <= 0){
        return res.status(404).json({
            status: "error",
            message: "Any article match with the search"
        }); 
       } 

       return res.status(200).json({
            status: "success",
            articles: articlesFound
       })

    });
}

module.exports = {
    createArticle,
    listArticles,
    detailArticle,
    deleteArticle,
    editArticle,
    uploadFile,
    image,
    searchArticle
}