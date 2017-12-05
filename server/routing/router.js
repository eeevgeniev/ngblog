const articleController = require('../controllers/articleController');
const userController = require('../controllers/userController');
const authorization = require('../passport/authorization');

module.exports = (app) => {
    app.get('/articles/:page', articleController.allArticles),
    app.get('/articles/my/:page', authorization, articleController.myArticles),
    app.get('/article/:name', articleController.articleByName),
    app.post('/article', authorization, articleController.articleCreate),
    app.put('/article/:id', authorization, articleController.articleUpdate),
    app.delete('/article/:id', authorization, articleController.articleDelete),
    app.post('/login', userController.userLogin),
    app.post('/register', userController.userRegister),
    app.post('/logout', userController.userLogout),
    app.get('/me', authorization, userController.userGet),
    app.put('/me', authorization, userController.userUpdate),
    app.all('*', (req, res) => {
        res.writeHead(404, {
            'content-type' : 'text/plain'
        });

        res.write('404. Page not found');
        res.end();
    })
};