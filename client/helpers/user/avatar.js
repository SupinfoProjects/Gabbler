Template.userAvatar.helpers({
    getAvatarFromUser: function(user, size) {
        return getAvatarUrl(user.emails[0].address, size);
    },
    getAvatarFromHash: function(hash, size) {
        return getAvatarUrl(hash, size);
    }
});

function getAvatarUrl(input, size) {
    return Gravatar.imageUrl(input, {
        size: size,
        default: 'mm'
    });
}
