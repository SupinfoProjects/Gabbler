Meteor.methods({
    addMessage: function(content) {
        if (!Meteor.userId() || content.length > MAX_MESSAGE_LENGTH) {
            throw new Meteor.Error('not-authorized');
        }

        var user = Meteor.users.findOne({ _id: Meteor.userId() });
        var date = new Date();

        Messages.insert({
            content: content,
            createdAt: date,
            authorId: Meteor.userId(),
            username: user.username,
            avatarHash: user.profile.avatarHash,
            tags: extractAndSaveTags(content, date),
            likedBy: {}
        });
    }
});
