Meteor.publish('search-users', function() {
    return Meteor.users.find({}, {
        fields: {
            username: 1,
            profile: 1
        }
    });
});

Meteor.publish('search-tags', function() {
    return Tags.find();
});
