Template.userProfile.events({
    'click .follow': function() {
        console.log('toggle following', Router.current().params.username);
        Meteor.call('toggleFollowing', Router.current().params.username);
    }
});
