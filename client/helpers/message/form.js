Template.messageForm.helpers({
    maxLength: 255,
    connectedUserEmail: function() {
        return Meteor.user().emails[0].address;
    }
});
