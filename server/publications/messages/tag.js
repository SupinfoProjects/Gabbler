Meteor.publish('messagesWithTag', function(name) {
    return Messages.find({
        tags: {
            $in: [name]
        }
    });
});
