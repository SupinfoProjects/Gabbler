Meteor.publish('following', function(username) {
    return findUsers(username, 'following');
});
