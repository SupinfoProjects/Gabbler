findUsers = function(username, type) {
    var user = Meteor.users.findOne({
        username: username
    });

    var ids = Object.keys(user[type]);

    return Meteor.users.find({ _id: { $in: ids } }, {
        fields: {
            username: 1,
            avatarHash: 1
        }
    });
};
