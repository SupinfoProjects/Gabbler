Template.messageShow.helpers({
    date: function() {
        return this.createdAt.toISOString();
    },
    content: function() {
        return this.content
            .replace(TAG_REGEX, '$1<a href="/tag/$2">#$2</a>')
            .replace(USER_REGEX, '$1<a href="/user/$2">@$2</a>');
    }
});

Template.messageShow.rendered = function() {
    $('.timeline').find('small.time-ago').timeago();
};
