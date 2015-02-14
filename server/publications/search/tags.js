Meteor.publish('searchTags', function() {
    return Tags.find({}, {
        fields: {
            name: 1,
            score: 1
        }
    });
});
