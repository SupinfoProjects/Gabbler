Template.notificationList.helpers({
    hidden: function(list) {
        var hidden = true;

        list.forEach(function(notification) {
            if (!notification.read) {
                hidden = false;
                return false;
            }
        });

        return hidden ? 'hidden' : '';
    },
    empty: function(list) {
        return list.length === 0;
    }
});
