Meteor.publish('searchUsers', function() {
    return Meteor.users.find({}, {
        fields: {
            username: 1,
            profile: 1,
            status: 1
        }
    });
});

Meteor.publish('searchTags', function() {
    return Tags.find();
});
