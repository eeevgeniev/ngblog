const mongoose = require('mongoose');

let tagSchema = mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, required: true, unique: true }
});

let tag = mongoose.model('tag', tagSchema);

module.exports = tag;

module.exports.seedTags = () => {
    tag.find({}, (error, tags) => {
        if (error) {
            console.log(error);
            return;
        }

        if (tags.length == 0) {
            tag.create([
                { name: 'Programming' }, 
                { name: 'Lorem ipsum' }, 
                { name: 'Literature' }, 
                { name: 'Science' }, 
                { name: 'Computers' }, 
                { name: 'Other' }, 
                { name: 'Politics' }, 
                { name: 'SoftUni' }], (error) => {
                if (error) {
                    console.log(error);
                    return;
                }

                console.log('Tags seeded');
            })
        }
    });
};