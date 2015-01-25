Accounts.onCreateUser(function(options, user) {
    user.profile = options.profile
        ? options.profile
        : {};

    /** @namespace user.emails */
    user.profile.avatarHash = Gravatar.hash(user.emails[0].address);
    user.profile.following = {};
    user.profile.followers = {};

    return user;
});
