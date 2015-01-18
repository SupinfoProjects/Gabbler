Template.userProfile.helpers({
    user: function() {
        return Meteor.users.findOne({
            username: Router.current().params.username
        });
    },
    formatDate: function(date) {
        return date.toDateString();
    }
});
