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
            finished: function(index, fileInfo) {
                Meteor.call('updateBackground', fileInfo.name);
            }
        };
    },
    style: function (background) {
        return background !== null
            ? 'background-image: url("/upload/' + background + '");'
            : '';
    }
});
