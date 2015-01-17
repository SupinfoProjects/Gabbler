Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: '404'
});

Router.route('/', {
    name: 'home',
    template: 'timeline',
    waitOn: function() {
        return [
            Meteor.subscribe('messages')
        ];
    }
});
