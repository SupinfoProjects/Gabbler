Meteor.publish('likes', function(id) {
    // Message details
    if (id) {
        return Meteor.users.find({ _id: id }, {
            fields: {
                username: 1,
                status: 1
            }
        });
    }

    // Timeline
    return Meteor.users.find({}, {
        fields: {
            username: 1,
            status: 1
        }
    });
});
