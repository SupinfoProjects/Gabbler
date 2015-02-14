Template.messageForm.helpers({
    ready: function() {
        return isSearchSubscriptionReady();
    },
    maxLength: MAX_MESSAGE_LENGTH,
    settings: {
        position: 'bottom',
        limit: 10,
        rules: [{
            token: '@',
            collection: Meteor.users,
            field: 'username',
            template: Template.completeUserShow,
            noMatchTemplate: Template.completeUserEmpty,
            matchAll: true
        }, {
            token: '#',
            collection: Tags,
            field: 'name',
            template: Template.completeTagShow,
            noMatchTemplate: Template.completeTagEmpty,
            matchAll: true
        }]
    }
});
