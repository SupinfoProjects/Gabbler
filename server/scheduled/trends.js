regroupUsagesPerMinute = function(dates) {
    var output = {};

    dates.forEach(function(date) {
        var index = dateToIndex(date);

        if (output[index]) {
            output[index]++;
        } else {
            output[index] = 1;
        }
    });

    var min = parseInt(_.min(Object.keys(output)));
    var max = dateToIndex(new Date());

    for (var index = min; index < max; index += 60) {
        if (!output.hasOwnProperty(index)) {
            output[index] = 0;
        }
    }

    return output;
};

function dateToIndex(date) {
    date.setMilliseconds(0);
    date.setSeconds(0);

    return date.getTime() / 1000;
}

var task = new ScheduledTask('every 1 minute', function() {
    // Get tags
    var tags = Tags.find();

    // Next usage estimation
    tags.forEach(function(tag) {
        var usages = regroupUsagesPerMinute(tag.usedAt);
        var x = [], y = [], i = 0;

        for (var date in usages) {
            if (usages.hasOwnProperty(date)) {
                x.push(i);
                y.push(usages[date]);

                i++;
            }
        }

        var spline = numeric.spline(x, y);
        var score = spline.at(i);

        if (score != tag.score) {
            Tags.update(tag._id, {
                $set: {
                    score: score
                }
            });
        }
    });
});

task.start();
