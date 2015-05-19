Template.userProfile.helpers({
    user: function() {
        return Meteor.users.findOne({
            username: Router.current().params.username
        });
    },
    formatDate: function(date) {
        return date.toDateString();
    },
    editable: function () {
        return Router.current().params.username === Meteor.user().username;
    },
    uploadCallbacks: function () {
        return {
            finished: function(index, fileInfo, context) {
                console.log(index, fileInfo, context);
                // TODO: link the file to the user
            }
        };
    }
});
