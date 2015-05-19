MAX_LENGTH = 70;

Template.searchMessage.helpers({
    content: function () {
        return this.content.length <= MAX_LENGTH
            ? this.content
            : this.content.substring(0, MAX_LENGTH - 3) + '...';
    }
});
