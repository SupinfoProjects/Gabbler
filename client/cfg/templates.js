Template.notifications.inheritsEventsFrom('notificationList');
Template.notifications.inheritsHelpersFrom('notificationList');
Template.notificationShow.inheritsHelpersFrom('notifications');
Template.notificationList.replaces('notifications');
