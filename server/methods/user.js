var fs = Npm.require('fs');
var path = Npm.require('path');

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
    },
    updateBackground: function (filename) {
        if (!Meteor.userId()) {
            throw new Error('not-authorized');
        }

        var DIR = process.env.PWD + '/.uploads/backgrounds/';

        // If uploaded file exists
        fs.exists(DIR + filename, Meteor.bindEnvironment(function (exists) {
            if (exists) {
                // Remove the old background
                var oldFilename = Meteor.user().profile.background;

                fs.exists(DIR + oldFilename, function (exists) {
                    if (exists) {
                        fs.unlink(DIR + oldFilename, function (err) {
                            if (err) {
                                throw err;
                            }
                        });
                    }
                });

                // Rename the new one
                var newFilename = Meteor.userId() + path.extname(DIR + filename);

                Meteor.users.update(Meteor.userId(), {
                    $set: {
                        'profile.background': newFilename
                    }
                });

                fs.rename(DIR + filename, DIR + newFilename, Meteor.bindEnvironment(function (err) {
                    if (err) {
                        Meteor.users.update(Meteor.userId(), {
                            $set: {
                                'profile.background': null
                            }
                        });

                        throw err;
                    }
                }));
            }
        }));
    }
});
