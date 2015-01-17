Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: '404'
});

Router.route('/', {
    name: 'home',
    template: 'messageList',
    waitOn: function() {
        return [
            Meteor.subscribe('messages')
        ];
    }
});

Router.route('/user/:username', {
    name: 'profile',
    template: 'userProfile',
    waitOn: function() {
        return [
            Meteor.subscribe('profile', this.params.username),
            Meteor.subscribe('messages', this.params.username)
        ];
    }
});
