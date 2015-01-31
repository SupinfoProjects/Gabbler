Meteor.methods({
    addMessage: function(content) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        var user = Meteor.users.findOne({ _id: Meteor.userId() });
        var matches = content.match(tagRegex);

        if (matches) {
            var tags = matches.map(function(tag) {
                return tag.trim().substring(1);
            });

            var existingTags = Tags.find({ name: { $in: tags } }).fetch();

            _.each(existingTags, function(tag) {
                tags.splice(tags.indexOf(tag.name), 1);

                Tags.update(this._id, { $set: {
                    occurences: tag.occurences + 1
                }});
            });

            _.each(tags, function(name) {
                console.log('insert tag', name);

                Tags.insert({
                    name: name,
                    occurences: 1
                });
            });
        }

        Messages.insert({
            content: content,
            createdAt: new Date(),
            authorId: Meteor.userId(),
            username: user.username,
            avatarHash: user.profile.avatarHash,
            likedBy: {}
        });
    }
});
