Template.searchForm.helpers({
    hide: function() {
        return !isSearchSubscriptionReady();
    },
    options: function () {
        return {
            class: 'form-control typeahead',
            type: 'text',
            placeholder: 'Search for...',
            autocomplete: 'off',
            spellcheck: 'false',
            'data-sets': 'sets'
        };
    },
    sets: function() {
        return [{
            name: 'users',
            valueKey: 'username',
            local: function() {
                return Meteor.users.find().fetch();
            },
            template: 'searchUser'

        }, {
            name: 'tags',
            valueKey: 'name',
            local: function() {
                return Tags.find().fetch();
            },
            template: 'searchTag'
        }, {
            name: 'messages',
            valueKey: 'content',
            local: function() {
                return Messages.find().fetch();
            },
            template: 'searchMessage'
        }];
    }
});

Template.searchForm.rendered = function() {
    Meteor.typeahead.inject();

    var events = ['select', 'autocomplete', 'cursorchange'];

    events.forEach(function (event) {
        $('.typeahead').bind('typeahead:' + event, updateField);
    });
};

function updateField (event, suggestion) {
    var value = null;

    if (!suggestion) {
        value = '';
    }

    else if ('content' in suggestion) {
        value = suggestion.content;
    }

    else if ('name' in suggestion) {
        value = suggestion.name;
    }

    else if ('username' in suggestion) {
        value = suggestion.username;
    }

    var input = $(event.target);
    input.val(value);
    input.typeahead('val', value);
}
