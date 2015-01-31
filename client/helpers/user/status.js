Template.userStatus.helpers({
    color: function() {
        return this.status.online
            ? 'label-success'
            : 'label-danger';
    },
    status: function() {
        return this.status.online
            ? 'online'
            : 'offline';
    }
});
