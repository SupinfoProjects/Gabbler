Router.route('/', {
    name: 'home',
    template: 'messageList',
    waitOn: function() {
        return [
            Meteor.subscribe('timeline'),
            Meteor.subscribe('likes'),
            Meteor.subscribe('comments'),
            Meteor.subscribe('suggestedUsers')
        ];
    }
});
