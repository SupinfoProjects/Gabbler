Meteor.publish('messagesFromUser', function(username) {
    return Messages.find({
        username: username
    });
});
