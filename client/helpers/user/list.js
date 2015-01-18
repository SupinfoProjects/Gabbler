Template.userList.helpers({
    users: function(user, type) {
        var ids = Object.keys(user[type]);

        return Meteor.users.find({ _id: { $in: ids } }, {
            fields: {
                username: 1,
                avatarHash: 1
            }
        });
    },
    isEmpty: function(user, type) {
        var ids = Object.keys(user[type]);

        return Meteor.users.find({ _id: { $in: ids } }).count() === 0;
    }
});
