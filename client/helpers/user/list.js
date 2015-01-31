Template.userList.helpers({
    users: function() {
        return Meteor.users.find({
            _id: {
                $in: Object.keys(this.user.profile[this.type])
            }
        }, {
            fields: {
                username: 1,
                'profile.avatarHash': 1
            }
        });
    },
    isEmpty: function() {
        return (Meteor.users.find({
            _id: {
                $in: Object.keys(this.user.profile[this.type])
            }
        }).count() === 0);
    }
});
