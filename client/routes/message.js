Router.route('/message/:id', {
    name: 'message',
    template: 'messageDetails',
    waitOn: function() {
        return [
            Meteor.subscribe('message', this.params.id),
            Meteor.subscribe('likes', this.params.id),
            Meteor.subscribe('commentsByDoc', this.params.id)
        ];
    }
});
