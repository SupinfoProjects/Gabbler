Template.userFollowButton.helpers({
    distinctUsers: function() {
        return this.user._id !== Meteor.userId();
    },
    color: function() {
        return isFollowing(this.user)
            ? 'btn-danger'
            : 'btn-success';
    },
    icon: function() {
        return isFollowing(this.user)
            ? 'glyphicon-minus-sign'
            : 'glyphicon-plus-sign';
    },
    label: function() {
        return isFollowing(this.user)
            ? 'Unfollow'
            : 'Follow';
    }
});
