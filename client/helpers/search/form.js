Template.searchForm.helpers({
    hide: function() {
        return !isSearchSubscriptionReady();
    },
    sets: function() {
        return [{
            name: 'users',
            valueKey: 'username',
            local: function() {
                return Meteor.users.find().fetch();
            },
            template: 'searchUser'

        },{
            name: 'tags',
            valueKey: 'name',
            local: function() {
                return Tags.find().fetch();
            },
            template: 'searchTag'
        }];
    }
});

Template.searchForm.rendered = function() {
    Meteor.typeahead.inject();
};
