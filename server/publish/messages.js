Meteor.publish('messages', function(username) {
    // Profile timeline
    if (username) {
        return Messages.find({
            username: username
        });
    }

    // Connected user timeline
    if (this.userId) {
        var user = Meteor.users.findOne({
            _id: this.userId
        });

        var ids = Object.keys(user.following);
        ids.push(this.userId);

        return Messages.find({
            authorId: {
                $in: ids
            }
        });
    }

    // Global timeline
    return Messages.find();
});
