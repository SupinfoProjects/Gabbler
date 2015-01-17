Meteor.methods({
    toggleFollowing: function(username) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        var connectedUser = Meteor.users.findOne({ _id: Meteor.userId() });
        var targetUser = Meteor.users.findOne({ username: username });

        if (isFollowing(connectedUser, targetUser)) {
            console.log('remove');

            delete connectedUser.following[targetUser._id];
            delete targetUser.followers[connectedUser._id];
        } else {
            console.log('add');

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
