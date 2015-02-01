var subscribedToTrends = Meteor.subscribe('trends');

Template.tagList.helpers({
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
    },
    isEmpty: function() {
        return (Tags.find({}, {
            limit: 10
        }).count() === 0);
    }
});
