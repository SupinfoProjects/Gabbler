Template.messageDetails.helpers({
    message: function() {
        return Messages.findOne({
            _id: Router.current().params.id
        });
    },
    formatDate: function(date) {
        return date.toDateString();
    }
});
