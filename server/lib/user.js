findUsers = function(username, type) {
    var user = Meteor.users.findOne({
        username: username
    });

    return Meteor.users.find({ _id: { $in: Object.keys(user.profile[type]) } }, {
        fields: {
            username: 1,
            profile: 1,
            status: 1
        }
    });
};

extractUsers = function(message) {
    var matches = message.match(USER_REGEX);

    if (!matches) {
        return [];
    }

    return _.uniq(matches.map(function(user) {
        return user.trim().substring(1);
    }));
};

