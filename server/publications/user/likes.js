Meteor.publish('likes', function() {
    return Meteor.users.find({}, {
        fields: {
            username: 1,
            status: 1
        }
    });
});
