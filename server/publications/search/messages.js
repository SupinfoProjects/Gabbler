Meteor.publish('searchMessages', function() {
    return Messages.find();
});
