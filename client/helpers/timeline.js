Template.timeline.helpers({
    emptyTimeline: function() {
        return Messages.find().count() === 0;
    },
    messages: function() {
        return Messages.find({}, {
            sort: {
                createdAt: -1
            }
        });
    }
});
