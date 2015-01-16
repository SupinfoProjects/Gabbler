Meteor.publish('messages', function() {
    if (this.userId) {
        // Connected user timeline
        var user = Meteor.users.findOne({
            _id: this.userId
        });

        var ids = user.following;
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
