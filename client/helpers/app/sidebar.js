Template.sidebar.helpers({
    suggestedUsers: function() {
        return Meteor.users.find(
            getSuggestedQuery(Meteor.userId()),
            {
                sort: {
                    createdAt: -1
                }
            }
        );
    }
});
