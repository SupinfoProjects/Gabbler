Template.userProfile.events({
    'click .toggle-following': function() {
        Meteor.call('toggleFollowing', Router.current().params.username);
    }
});
