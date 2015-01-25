Meteor.methods({
    toggleFollowing: function(username) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
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
