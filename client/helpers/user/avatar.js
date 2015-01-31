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
    }
});

function getSize(size) {
    return size
        ? size
        : DEFAULT_SIZE;
}
