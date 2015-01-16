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
            authorUsername: user.username,
            avatarHash: Gravatar.hash(user.emails[0].address),
            likedBy: {}
        });
    }
});
