Meteor.publish('trends', function() {
    return Tags.find({}, {
        fields: {
            name: 1,
            score: 1
        },
        sort: {
            score: -1
        },
        limit: 10
    });
});
