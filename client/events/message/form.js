Template.messageForm.events({
    'focus #message-new-content': function() {
        showActions();
    },
    'blur #message-new-content': function() {
        hideActions();
    },
    'keydown #message-new-content, keyup #message-new-content': function() {
        updateCounter();
    },
    'keyup #message-new': function(event) {
        if (event.which === 13) {
            addMessage(event);
        }
    },
    'submit #message-new': function(event) {
        addMessage(event);
    }
});

// Save message
function addMessage(event) {
    event.preventDefault();
    var input = $('#message-new-content');
    Meteor.call('addMessage', input.val());
    $('#message-new')[0].reset();
    input.blur();
    hideActions();
    updateCounter();
}

// Show actions
function showActions() {
    var actions = $('#message-new-actions');

    if (actions.hasClass('hidden')) {
        updateSubmit();
        actions.removeClass('hidden');
        $('#message-new-content').attr('rows', 3);
    }
}

// Hide actions bar
function hideActions() {
    var content = $('#message-new-content');

    if (content.val().length === 0) {
        var actions = $('#message-new-actions');

        if (!actions.hasClass('hidden')) {
            actions.addClass('hidden');
            content.attr('rows', 1);
        }
    }
}

// Update counter
function updateCounter() {
    var content = $('#message-new-content');

    $('#message-new-counter').text(content.attr('maxlength') - content.val().length);
    updateSubmit();
}

// Update submit button
function updateSubmit() {
    var submit  = $('#message-new-submit');

    if ($('#message-new-content').val().length === 0) {
        submit.addClass('disabled');
    } else {
        submit.removeClass('disabled');
    }
}
