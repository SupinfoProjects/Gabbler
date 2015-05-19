Router.route('/tag/:name', {
    name: 'tag',
    template: 'messageList',
    waitOn: function() {
        return [
            Meteor.subscribe('messagesWithTag', this.params.name),
            Meteor.subscribe('likes'),
            Meteor.subscribe('comments'),
            Meteor.subscribe('suggestedUsers')
        ];
    }
});
