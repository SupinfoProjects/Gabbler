Meteor.methods({
    addMessage: function(content) {
        if (!Meteor.userId() || content.length > MAX_MESSAGE_LENGTH) {
            throw new Meteor.Error('not-authorized');
        }

        var usernames = extractUsers(content);
        var date = new Date();

        var id = Messages.insert({
            content: content,
            createdAt: date,
            authorId: Meteor.userId(),
            username: Meteor.user().username,
            avatarHash: Meteor.user().profile.avatarHash,
            tags: extractAndSaveTags(content),
            users: usernames,
            likedBy: []
        });

        var users = Meteor.users.find({ username: { $in: usernames } }).fetch();

        _.each(users, function(user) {
            Notifications.new({
                title: Meteor.user().username + ' mentioned you',
                link: '/messages/' + id,
                icon: 'envelope',
                class: 'info',
                owner: user._id,
                date: date
            });
        });
    },
    toggleLike: function(message) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        if (_.contains(message.likedBy, Meteor.userId())) {
            Messages.update(message._id, {
                $pull: {
                    likedBy: Meteor.userId()
                }
            });

            Notifications.new({
                title: Meteor.user().username + ' unliked your message',
                link: '/user/' + Meteor.user().username,
                icon: 'heart',
                class: 'danger',
                owner: message.authorId,
                date: new Date()
            });
        } else {
            Messages.update(message._id, {
                $push: {
                    likedBy: Meteor.userId()
                }
            });

            Notifications.new({
                title: Meteor.user().username + ' likes your message',
                link: '/user/' + Meteor.user().username,
                icon: 'heart',
                class: 'info',
                owner: message.authorId,
                date: new Date()
            });
        }
    }
});
