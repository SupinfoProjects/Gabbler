searchSettings = function() {
    return {
        position: 'bottom',
        limit: 10,
        rules: [{
            token: '@',
            collection: Meteor.users,
            field: 'username',
            template: Template.searchUser,
            noMatchTemplate: Template.searchEmpty,
            matchAll: true
        }, {
            token: '#',
            collection: Tags,
            field: 'name',
            template: Template.searchTag,
            noMatchTemplate: Template.searchEmpty,
            matchAll: true
        }]
    }
};
