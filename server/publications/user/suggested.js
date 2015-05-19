Meteor.publish('suggestedUsers', function() {
    return Meteor.users.find(
        getSuggestedQuery(this.userId),
        {
            fields: {
                username: 1,
                status: 1
            },
            limit: 10,
            sort: {
                createdAt: -1
            }
        }
    );
});
