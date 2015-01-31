Meteor.methods({
    addMessage: function(content) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        var user = Meteor.users.findOne({ _id: Meteor.userId() });
        var date = new Date();

        extractAndSaveTags(content, date);

        Messages.insert({
            content: content,
            createdAt: date,
            authorId: Meteor.userId(),
            username: user.username,
            avatarHash: user.profile.avatarHash,
            likedBy: {}
        });
    }
});
