const multer = require('multer');
const upload = multer({dest: 'temp/'});

const articleController = require('../controllers/articleController');
const userController = require('../controllers/userController');
const tagController = require('../controllers/tagController');
const authorization = require('../passport/authorization');

module.exports = (app) => {
    app.get('/articles/:page', authorization, articleController.allArticles),
    app.get('/articles/my/:page', authorization, articleController.myArticles),
    app.get('/article/:id', authorization, articleController.articleById),
    app.post('/article', authorization, articleController.articleCreate),
    app.put('/article', authorization, articleController.articleUpdate),
    app.delete('/article/:id', authorization, articleController.articleDelete),
    app.post('/login', userController.userLogin),
    app.post('/register', userController.userRegister),
    app.post('/logout', authorization, userController.userLogout),
    app.get('/me', authorization, userController.userGet),
    app.put('/me', authorization, userController.userUpdate),
    app.get('/tags', authorization, tagController.tags),
    app.post('/article/images/add', authorization, upload.array('photos', 5), articleController.articleImages)
    app.all('*', (req, res) => {
        res.writeHead(404, {
            'content-type' : 'text/plain'
        });

        res.write('404. Page not found');
        res.end();
    })
};