DEFAULT_SIZE = 48;

Template.userAvatar.helpers({
    size: function() {
        return getSize(this.size);
    },
    url: function() {
        if (this.hash) return Gravatar.imageUrl(this.hash, {
            size: getSize(this.size),
            default: 'mm'
        });
    },
    editable: function() {
        return this.editable && Router.current().params.username === Meteor.user().username;
    }
});

function getSize(size) {
    return size
        ? size
        : DEFAULT_SIZE;
}
