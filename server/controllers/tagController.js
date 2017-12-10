const Tag = require('../models/tag');

createErrorResponse = (res, message) => {
    res.status(200).json({
        success: false,
        message: message
    });
};

module.exports = {
    tags: (req, res) => {
        Tag.find({}, (error, tags) => {
            if (error) {
                createErrorResponse(res, error);
                return;
            }

            return res.status(200).json({
                success: true,
                message: "",
                tags: tags
            });
        });
    }
};