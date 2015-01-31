var subscribedToTrends = Meteor.subscribe('trends');

Template.tagTrends.helpers({
    isReady: function() {
        return subscribedToTrends.ready();
    },
    tags: function() {
        return Tags.find({}, {
            sort: {
                score: -1
            },
            limit: 10
        });
    }
});
