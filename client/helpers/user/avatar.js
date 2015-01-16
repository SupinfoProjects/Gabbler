Template.userAvatar.helpers({
    getAvatarFromUser: function(user) {
        return getAvatarUrl(user.emails[0].address);
    },
    getAvatarFromHash: function(hash) {
        return getAvatarUrl(hash);
    }
});

function getAvatarUrl(input) {
    return Gravatar.imageUrl(input, {
        size: 48,
        default: 'mm'
    });
}
