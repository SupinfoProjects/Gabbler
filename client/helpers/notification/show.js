Template.notificationShow.helpers({
    date: function() {
        return this.date.toISOString();
    }
});

Template.notificationShow.rendered = function() {
    $('#notifications-list').find('span.time-ago').timeago();
};
