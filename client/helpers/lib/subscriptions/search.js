isSearchSubscriptionReady = function() {
    return Meteor.subscribe('searchUsers').ready() && Meteor.subscribe('searchTags').ready();
};
