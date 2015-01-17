Accounts.onCreateUser(function(options, user) {
    user.avatarHash = Gravatar.hash(user.emails[0].address);
    user.following = {};
    user.followers = {};

    return user;
});
