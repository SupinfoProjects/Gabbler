isFollowing = function(user) {
    if (Meteor.user().following) {
        for (var index in Meteor.user().following) {
            if (index === user._id) {
                return true;
            }
        }
    }

    return false;
};
