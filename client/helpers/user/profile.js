Template.userProfile.helpers({
    user: function() {
        return Meteor.users.findOne({
            username: Router.current().params.username
        });
    },
    notMyProfile: function(connectedUser, profileUser) {
        return connectedUser._id !== profileUser._id;
    },
    getFollowButtonIcon: function(connectedUser, profileUser) {
        return isFollowing(connectedUser, profileUser)
            ? 'glyphicon-minus-sign'
            : 'glyphicon-plus-sign';
    },
    getFollowButtonLabel: function(connectedUser, profileUser) {
        return isFollowing(connectedUser, profileUser)
            ? 'Unfollow'
            : 'Follow';
    },
    getDisplayableDate: function(date) {
        return date.toDateString();
    }
});
