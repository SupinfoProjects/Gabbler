var subscribedToUsers = Meteor.subscribe('searchUsers');
var subscribedToTags  = Meteor.subscribe('searchTags');

Template.searchForm.helpers({
    isReady: function() {
        return subscribedToUsers.ready() && subscribedToTags.ready();
    },
    settings: searchSettings
});
