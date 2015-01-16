Accounts.onCreateUser(function(options, user) {
    user.following = [];
    user.followers = [];

    if (!user.username) {
        user.username = null;
    }

    if (!user.emails) {
        user.emails = [];
    }

    return user;
});
