Meteor.methods({
    toggleFollowing: function(username) {
        if (!Meteor.userId()) {
            throw new Error('not-authorized');
        }

        var connectedUser = Meteor.user();
        var targetUser = Meteor.users.findOne({ username: username });

        if (isFollowing(targetUser)) {
            delete connectedUser.profile.following[targetUser._id];
            delete targetUser.profile.followers[connectedUser._id];
        } else {
            connectedUser.profile.following[targetUser._id] = {
                username: targetUser.username,
                avatarHash: targetUser.profile.avatarHash
            };

            targetUser.profile.followers[connectedUser._id] = {
                username: connectedUser.username,
                avatarHash: connectedUser.profile.avatarHash
            };

            Notifications.new({
                title: Meteor.user().username + ' is now following you',
                link: '/user/' + connectedUser.username,
                icon: 'user',
                class: 'success',
                owner: targetUser._id,
                date: new Date()
            });
        }

        Meteor.users.update({ _id: Meteor.userId() }, {
            $set: {
                'profile.following': connectedUser.profile.following
            }
        });

        Meteor.users.update({ username: username }, {
            $set: {
                'profile.followers': targetUser.profile.followers
            }
        });
    }
});
