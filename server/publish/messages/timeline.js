Meteor.publish('timeline', function() {
    // Connected user timeline
    if (this.userId) {
        var user = Meteor.users.findOne({
            _id: this.userId
        });

        var ids = Object.keys(user.profile.following);
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
