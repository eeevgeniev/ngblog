const fs = require('fs');
const path = require('path');
const Article = require('../models/article');
const Image = require('../models/image');
const limit = 10;
const imageDirectory = path.join(__dirname, '../public/images');

createErrorResponse = (res, message) => {
    res.status(200).json({
        success: false,
        message: message
    });
};

createPagination = (page, count) => {
    if (isNaN(page)) {
        page = 1;
    }
    
    page = parseInt(page);

    if (page < 1 || (--page * limit) > count) {
        page = 0;
    }

    return page;
};

module.exports = {
    allArticles: (req, res) => {
        let page = req.params['page'] || 1,
            remainder = 0,
            pages = 0;

        Article.count({deleted: false}, (error, count) => {
            if (error) {
                createErrorResponse(res, error);
                return;
            }

            page = createPagination(page, count);

            Article.find(
                {deleted: false}, //, 
                '_id title author created tags',
                {skip: page * limit, limit: limit},
                (error, articles) => {
                if (error) {
                    createErrorResponse(res, error);
                    return;
                }

                pages = parseInt(count / limit);
                remainder = parseInt(count % limit);

                if (remainder !== 0) {
                    pages += 1;
                }

                return res.status(200).json({
                    success: true,
                    message: "",
                    pages: pages,
                    page: page + 1,
                    articles: articles
                });
            });
        });
    },
    myArticles: (req, res) => {
        let name = req.user.username,
            page = req.params['page'] || 1,
            remainder = 0,
            pages = 0;

            Article.count({$and: [{author: name}, {deleted: false}]}, (error, count) => {
                if (error) {
                    createErrorResponse(res, error);
                    return;
                }
    
                page = createPagination(page, count);
    
                Article.find(
                    {$and: [{author: name}, {deleted: false}]}, 
                    '_id title author created tags', 
                    {skip: page * limit, limit: limit}, 
                    (error, articles) => {
                    if (error) {
                        createErrorResponse(res, error);
                        return;
                    }

                    pages = parseInt(count / limit);
                    remainder = parseInt(count % limit);
    
                    if (remainder !== 0) {
                        pages += 1;
                    }
    
                    return res.status(200).json({
                        success: true,
                        message: "",
                        pages: pages,
                        page: page + 1,
                        articles: articles
                    });
                });
            });
    },
    articleById: (req, res) => {
        let id = req.params['id'];
        
        if (!id) {
            createErrorResponse(res, 'Please specify article id.')
            return;
        }
        
        Article.findById(id, (error, article) => {
            if (error) {
                createErrorResponse(res, error)
                return;
            }

            if (!article || article.deleted === true) {
                createErrorResponse(res, 'Article does not exists.')
                return;
            }

            res.status(200).json({
                success: true,
                message: "",
                article: article
            });
        });
    },
    articleCreate: (req, res) => {
        let article = req.body,
            now = new Date();
        
        article.author = req.user.username;
        article.created = now;
        article.modified = now;
        article.deleted = false;

        Article.create(article, (error, resultArticle) => {
            if (error) {
                createErrorResponse(res, error);
                return;
            }

            res.status(200).json({
                success: true,
                message: "",
                article: resultArticle
            });
        });
    },
    articleUpdate: (req, res) => {
        let parameters = req.body;

        Article.findOneAndUpdate({_id: parameters.id}, 
            {
                title: parameters.title,
                text: parameters.text,
                tags: parameters.tags,
                modified: new Date(),
            }, 
            (error, resultArticle) => {
            if (error) {
                createErrorResponse(res, error);
                return;
            }

            res.status(200).json({
                success: true,
                message: "",
                article: resultArticle
            });
        });
    },
    articleDelete: (req, res) => {
        let id = req.params['id'];

        Article.findOneAndUpdate({_id: id}, 
            {deleted: true, modified: new Date()}, 
            (error, resultArticle) => {
            if (error) {
                createErrorResponse(res, error);
                return;
            }

            res.status(200).json({
                success: true,
                message: "",
                article: resultArticle
            });
        });
    },
    articleImages: (req, res) => {
        if (!req.body && !req.body.id) {
            createErrorResponse(res, 'No article is specified.');
            return;
        }

        Article.findById(req.body.id, (error, article) => {
            if (error) {
                createErrorResponse(res, error);
                return;
            }

            if (article.images.length > 5 || article.images.length + req.files.length > 5) {
                createErrorResponse(res, 'Article can have maximum 5 images.');
                return;
            }

            let images = [],
                counter = 0;

            for (let i = 0, length = req.files.length; i < length; i += 1) {
                let filePath = path.join(imageDirectory, req.files[i].filename + req.files[i].originalname),
                    tempPath = path.join(__dirname, '../temp/' + req.files[i].filename);
                    imagePath = '/images/' + req.files[i].filename + req.files[i].originalname;

                images.push(imagePath);

                fs.copyFile(tempPath, filePath, (error) => {
                    if (error) {
                        createErrorResponse(res, `Error saving file ${req.files[i]}`);
                        return;
                    }

                    counter++;

                    if (counter === req.files.length) {
                        fs.readdir(path.join(__dirname, '../temp/'), (error, files) => {
                            if (error) {
                                console.log(error);
                                return;
                            }

                            files.forEach(f => {
                                let fileToDeletePath = path.join(__dirname, '../temp/', f);
                                fs.unlink(fileToDeletePath, (error) => {
                                    if (error) {
                                        console.log(error);
                                    }
                                });
                            })
                        });

                        article.images.forEach(i => images.unshift(i));
                        
                        Article.findByIdAndUpdate(req.body.id, {images: images},  (error, article) => {
                            if (error) {
                                createErrorResponse(res, error);
                                return;
                            }

                            res.status(200).json({
                                success: true,
                                message: "",
                                article: article
                            });
                        });
                    }
                });
            }
        });
    }
};