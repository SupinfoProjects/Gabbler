isFollowing = function(connectedUser, profileUser) {
    if (connectedUser.following) {
        for (var index in connectedUser.following) {
            if (index === profileUser._id) {
                return true;
            }
        }
    }

    return false;
};
