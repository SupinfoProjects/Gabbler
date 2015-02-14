Template.messageList.helpers({
    messages: function() {
        return Messages.find({}, {
            sort: {
                createdAt: -1
            }
        });
    },
    empty: function() {
        return Messages.find().count() === 0;
    }
});
