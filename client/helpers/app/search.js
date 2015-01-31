subscribedToUsers = Meteor.subscribe('search-users');
subscribedToTags  = Meteor.subscribe('search-tags');

Template.searchForm.helpers({
    isReady: function() {
        return subscribedToUsers.ready() && subscribedToTags.ready();
    },
    settings: function() {
        return {
            position: 'bottom',
            limit: 10,
            rules: [{
                token: '@',
                collection: Meteor.users,
                field: 'username',
                template: Template.searchUser,
                matchAll: true
            }, {
                token: '#',
                collection: Tags,
                field: 'name',
                template: Template.searchTag,
                matchAll: true
            }]
        }
    }
});
