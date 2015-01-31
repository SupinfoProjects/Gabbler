extractAndSaveTags = function(message, date) {
    var matches = message.match(tagRegex);

    if (!matches) {
        return;
    }

    var tags = _.uniq(matches.map(function(tag) {
        return tag.trim().substring(1);
    }));

    var existingTags = Tags.find({ name: { $in: tags } }).fetch();

    _.each(existingTags, function(tag) {
        Tags.update(tag._id, {
            $push: {
                usedAt: date
            }
        });

        tags.splice(tags.indexOf(tag.name), 1);
    });

    _.each(tags, function(name) {
        Tags.insert({
            name: name,
            usedAt: [date],
            score: 0
        });
    });
};
