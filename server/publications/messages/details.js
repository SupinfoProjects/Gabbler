Meteor.publish('message', function(id) {
    return Messages.find({ _id: id });
});
