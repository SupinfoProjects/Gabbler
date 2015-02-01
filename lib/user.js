USER_REGEX = /(^|\s)@([\wa-z\u00C0-\u017F]+)/gi;

isFollowing = function(user) {
    for (var id in Meteor.user().profile.following) {
        if (id === user._id) {
            return true;
        }
    }

    return false;
};
