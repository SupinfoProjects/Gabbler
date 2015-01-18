DEFAULT_SIZE = 48;

Template.userAvatar.helpers({
    size: function() {
        return getSize(this.size);
    },
    url: function(hash, size) {
        return Gravatar.imageUrl(getHash(this.hash), {
            size: getSize(this.size),
            default: 'mm'
        });
    }
});

function getHash(hash) {
    return hash
        ? hash
        : Meteor.user().emails[0].address;
}

function getSize(size) {
    return size
        ? size
        : DEFAULT_SIZE;
}
