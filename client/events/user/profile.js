Template.userProfile.events({
    'click .follow': function() {
        Meteor.call('toggleFollowing', Router.current().params.username);
    }
});
