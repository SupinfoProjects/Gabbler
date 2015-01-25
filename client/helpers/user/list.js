Template.userList.helpers({
    users: function() {
        var ids = Object.keys(this.user.profile[this.type]);

        return Meteor.users.find({ _id: { $in: ids } }, {
            fields: {
                username: 1,
                avatarHash: 1
            }
        });
    },
    isEmpty: function() {
        var ids = Object.keys(this.user.profile[this.type]);

        return Meteor.users.find({ _id: { $in: ids } }).count() === 0;
    }
});
