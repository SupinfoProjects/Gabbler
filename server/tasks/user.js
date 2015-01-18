Meteor.methods({
    toggleFollowing: function(username) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        var connectedUser = Meteor.user();
        var targetUser = Meteor.users.findOne({ username: username });

        if (isFollowing(targetUser)) {
            delete connectedUser.following[targetUser._id];
            delete targetUser.followers[connectedUser._id];
        } else {
            connectedUser.following[targetUser._id] = {
                username: targetUser.username,
                avatarHash: targetUser.avatarHash
            };

            targetUser.followers[connectedUser._id] = {
                username: connectedUser.username,
                avatarHash: connectedUser.avatarHash
            };
        }

        Meteor.users.update({ _id: Meteor.userId() }, {
            $set: {
                following: connectedUser.following
            }
        });

        Meteor.users.update({ username: username }, {
            $set: {
                followers: targetUser.followers
            }
        });
    }
});
