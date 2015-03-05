Template.messageShow.events({
    'click .message-likes': function() {
        var dialog = ReactiveModal.initDialog({
            template: Template.userList,
            title: 'Likes',
            buttons: {
                cancel: {
                    class: 'btn-default',
                    label: 'Close'
                }
            },
            doc: {
                message: this
            }
        });

        dialog.show();
    },
    'click .message-like': function() {
        Meteor.call('toggleLike', this);
    }
});