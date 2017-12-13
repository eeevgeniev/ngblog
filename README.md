# ngBlog

1. Description: Simple blog Angular 5/Node.js application for SoftUni Angular Fundamentals course.
Directory description:
    
* server - Node.js server
* client - Angular 5 front end application.

2. Description of __client\src\app__ directory
* directory article
    * article-module - article module which holds ArticlesComponent,
CreateArticleComponent, EditArticleComponent, MyComponent, ViewArticleComponent
    * articles
        * ArticlesComponent - component to display all articles
    * create-article
        * CreateArticleComponent - component for article creation
    * edit-article
        * EditArticleComponent - component for editing article
    * my
        * MyComponent - component for user articles
    * view-article
        * ViewArticleComponent - component for viewing specific article
* directory blog-routing
    * BlogRoutingModule - angular routing module
* configuration
    * setting - setting for ngBlog currently holds only server address.
* guards - guardians for routing
    * AuthGuardianService - for non register users.
    * NoAuthGuardianService - for register users.
* messages
    * MessageComponent - component for displaying messages to user
* models
    * articles - all articles models.
        * ArticleEditModel - model for editing a article.
        * ArticleInfoViewModel - model for displaying article.
        * ArticleInputModel - model for creating article.
        * ArticlePageViewModel - model for server response - many articles
        * ArticleResponseModel - model for server response - single article
        * ArticleViewModel - displays single article information.
    * responses
        * ResponseModel - model for server response
    * tags
        * Tag - model for tag
        * TagResponseModel - model for server response for tags
    * user
        * LoginModel - model for login
        * LoginUserModel - model for server response for login user 
        * PasswordModel - model for user passwords
        * RegisterModel - model for user registration
        * User - model for user personal data
        * UserResponseModel - model for server response for personal user data
    * services
        * messages 
            * MessageService - service for messages
        * requester
            * HttpRequesterService - service for ajax requests
        * store
            * BlogStoreService - service for storing user to local store
* user
    * login
        * LoginComponent - component for user logging
    * me
        * MeComponent - component for changing password and personal information
    * register
        * RegisterComponent - component for user registration
    * user
        * module - for user components, holds LoginComponent, MeComponent, RegisterComponent
    




