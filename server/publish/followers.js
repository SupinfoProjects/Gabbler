Meteor.publish('followers', function(username) {
    return findUsers(username, 'followers');
});
