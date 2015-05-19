Template.userFollowButton.events({
    'click .toggle-following': function() {
        Meteor.call('toggleFollowing', this.user.username);
    }
});
