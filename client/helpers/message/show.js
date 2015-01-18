Template.messageShow.helpers({
    date: function() {
        return this.createdAt.toISOString();
    }
});

Template.messageShow.rendered = function() {
    $('.timeline').find('small.time-ago').timeago();
};
