Template.messageShow.helpers({
    date: function() {
        return this.createdAt.toISOString();
    },
    content: function() {
        return this.content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(TAG_REGEX, '$1<a href="/tag/$2">#$2</a>')
            .replace(USER_REGEX, '$1<a href="/user/$2">@$2</a>');
    },
    comments: function() {
        return Comments.find({
            doc: this._id
        }).count();
    },
    likes: function() {
        return this.likedBy.length;
    },
    liked: function() {
        return _.contains(this.likedBy, Meteor.userId())
            ? 'liked'
            : null;
    },
    owned: function() {
        return this.authorId === Meteor.userId();
    }
});

Template.messageShow.rendered = function() {
    $('.timeline').find('small.time-ago').timeago();
};
