Template.notificationList.events({
    'click #notifications-all-as-read': function() {
        Notifications.readAll();
    }
});
