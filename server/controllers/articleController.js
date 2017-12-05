const Article = require('../models/article');
const Image = require('../models/image');
const limit = 10;

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
        let page = req.params['page'] || 1;

        Article.count({deleted: false}, (error, count) => {
            if (error) {
                createErrorResponse(res, error);
                return;
            }

            page = createPagination(page, count);

            Article.find(
                {deleted: false}, 
                'title, text, author, created, tags, images', 
                {skip: page * limit, take: limit}, 
                (error, articles) => {
                if (error) {
                    createErrorResponse(res, error);
                    return;
                }

                return res.status(200).json({
                    success: true,
                    message: "",
                    pages: (count % limit) + 1,
                    page: page + 1,
                    articles: articles
                });
            });
        });
    },
    myArticles: (req, res) => {
        let name = req.user.username,
            page = req.params['page'] || 1;

            Article.count({$and: [{author: name}, {deleted: false}]}, (error, count) => {
                if (error) {
                    createErrorResponse(res, error);
                    return;
                }
    
                page = createPagination(page, count);
    
                Article.find(
                    {$and: [{author: name}, {deleted: false}]}, 
                    'title, text, author, created, tags, images', 
                    {skip: page * limit, take: limit}, 
                    (error, articles) => {
                    if (error) {
                        createErrorResponse(res, error);
                        return;
                    }
    
                    return res.status(200).json({
                        success: true,
                        message: "",
                        pages: (count % limit) + 1,
                        page: page + 1,
                        articles: articles
                    });
                });
            });
    },
    articleByName: (req, res) => {
        let name = req.params['name'];
        
        if (!name) {
            createErrorResponse(res, 'Please specify article name.')
            return;
        }
        
        Article.findOne({name: name}, (error, article) => {
            if (error) {
                createErrorResponse(res, error)
                return;
            }

            if (!article || article.deleted === true) {
                createErrorResponse(res, 'Article does not exists.')
                return;
            }

            Image.find({_id: {$in: article.images}}, (error, images) => {
                if (error) {
                    createErrorResponse(res, error);
                    return;
                }

                let resultArticle = {
                    title: article.title,
                    text: article.text,
                    author: req.user.username,
                    created: article.created,
                    modified: article.modified,
                    tags: article.tags,
                    images: images.map(m => m.path)
                };
            });

            res.status(200).json({
                success: true,
                message: "",
                article: resultArticle
            });
        });
    },
    articleCreate: (req, res) => {
        let article = req.body;

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
        let parameters = req.body,
            id = req.params['id'];

        if (parameters.id != id) {
            createErrorResponse(res, 'Invalid article.');
            return;
        }

        Article.findOneAndUpdate({_id: article.id}, 
            {
                title: parameters.title,
                text: parameters.text,
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
        let parameters = req.body,
        id = req.params['id'];

    if (parameters.id != id) {
        createErrorResponse(res, 'Invalid article.');
        return;
    }

    Article.findOneAndUpdate({_id: article.id}, 
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
    }
};