Meteor.methods({
    addMessage: function(content) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        var user = Meteor.users.findOne({ _id: Meteor.userId() });

        Messages.insert({
            content: content,
            createdAt: new Date(),
            authorId: Meteor.userId(),
            username: user.username,
            avatarHash: user.avatarHash,
            likedBy: {}
        });
    }
});
