Template.tagList.helpers({
    ready: function() {
        return Meteor.subscribe('trends').ready();
    },
    tags: function() {
        return Tags.find({}, {
            sort: {
                score: -1
            },
            limit: 10
        });
    },
    empty: function() {
        return (Tags.find({}, {
            limit: 10
        }).count() === 0);
    }
});
