var MODE_PROFILE = 1;
var MODE_MESSAGE = 2;

Template.userList.helpers({
    users: function() {
        return Meteor.users.find({
            _id: {
                $in: getIds(this)
            }
        });
    },
    empty: function() {
        return (Meteor.users.find({
            _id: {
                $in: getIds(this)
            }
        }).count() === 0);
    }
});

function getMode(parameters) {
    if (parameters.user && parameters.type) {
        return MODE_PROFILE;
    }

    if (parameters.message) {
        return MODE_MESSAGE;
    }

    throw 'Invalid parameters';
}

function getIds(parameters) {
    switch (getMode(parameters)) {
        case MODE_PROFILE:
            return Object.keys(parameters.user.profile[parameters.type]);
            break;

        case MODE_MESSAGE:
            return parameters.message.likedBy;
            break;

        default:
            break;
    }
}
