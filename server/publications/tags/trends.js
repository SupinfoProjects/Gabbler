Meteor.publish('trends', function() {
    return Tags.find({}, {
        fields: {
            name: 1,
            predictedNextUsage: 1
        },
        sort: {
            predictedNextUsage: -1
        },
        limit: 10
    });
});
