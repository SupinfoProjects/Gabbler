Router.route('/user/:username', {
    name: 'profile',
    template: 'userProfile',
    waitOn: function() {
        return [
            Meteor.subscribe('profile', this.params.username),
            Meteor.subscribe('messagesFromUser', this.params.username),
            Meteor.subscribe('following', this.params.username),
            Meteor.subscribe('followers', this.params.username)
        ];
    }
});
