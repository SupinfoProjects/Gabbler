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
    'click .message-like': function(event) {
        Meteor.call('toggleLike', this);
        $(event.target).blur();
    },
    'click .message-remove': function() {
        var message = this;

        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this message!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false,
            html: false
        }, function() {
            Meteor.call('removeMessage', message);

            swal(
                "Deleted!",
                "Your message has been deleted.",
                "success"
            );
        });
    }
});