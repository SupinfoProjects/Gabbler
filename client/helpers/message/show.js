Template.messageShow.helpers({
    dateToISOString: function(date) {
        return date.toISOString();
    }
});

Template.messageShow.rendered = function() {
    $('#timeline').find('small.time-ago').timeago();
};
