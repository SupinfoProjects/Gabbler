PREDICT_TRENDS_ACCORDING_LAST_MINUTES = 60;

var task = new ScheduledTask('every 1 minute', function() {
    // Last minute timestamp
    var timestamp = new Date();

    timestamp.setMilliseconds(0);
    timestamp.setSeconds(0);

    timestamp = (timestamp.getTime() / 1000) - 60;

    // Get tags
    var tags = Tags.find({}, {
        sort: {
            predictedNextUsage: -1,
            lastMinuteUsages: -1
        }
    });

    // Next usage estimation
    tags.forEach(function(tag) {
        // New usages per minute array
        var usagesPerMinute = tag.usagesPerMinute;
        usagesPerMinute[timestamp] = tag.lastMinuteUsages;

        // Update the tag
        var values = {
            lastMinuteUsages: 0
        };

        values['usagesPerMinute.' + timestamp] = tag.lastMinuteUsages;

        Tags.update(tag._id, {
            $set: values
        });

        // Predict next usage
        var data = getLastUsages(usagesPerMinute, timestamp);
        var spline = numeric.spline(data.x, data.y);
        var predictedNextUsage = spline.at(PREDICT_TRENDS_ACCORDING_LAST_MINUTES);

        if (predictedNextUsage != tag.predictedNextUsage) {
            Tags.update(tag._id, {
                $set: {
                    predictedNextUsage: predictedNextUsage
                }
            });
        }
    });
});

task.start();

function getLastUsages(usagesPerMinute, to) {
    var from = to - 60 * (PREDICT_TRENDS_ACCORDING_LAST_MINUTES - 1);
    
    var output = {
        x: [],
        y: []
    };

    for (var key = from, x = 0; key <= to; key += 60, x++) {
        output.x.push(x);
        output.y.push(key in usagesPerMinute ? usagesPerMinute[key] : 0);
    }

    return output;
}
