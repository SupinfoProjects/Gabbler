getRandomTags = function(total) {
    // Random dates
    var start = new Date(2015, 0, 1);
    var end = new Date();

    function randomDate() {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    // Random tags
    var tags = [];

    for (var i = 1; i <= total; i++) {
        var limit = Math.floor((Math.random() * 100) + 2);
        var usedAt = [];

        for (var j = 1; j <= limit; j++) {
            usedAt.push(randomDate());
        }

        tags.push({
            name: 'tag' + i,
            usedAt: usedAt
        });
    }

    return tags;
};

// Trend score calculator
function TrendScoreCalculator(tags, decay) {
    this.averageSqr = 0;
    this.average = 0;
    this.decay = 0;
    this.list = [];
    this.tags = [];

    this.initialize(tags, decay);
}

TrendScoreCalculator.prototype.initialize = function(tags, decay) {
    this.decay = decay;
    var self = this;
    var id = 1;

    tags.forEach(function(tag) {
        self.tags.push({
            id: id,
            name: tag.name
        });

        tag.usedAt.forEach(function(date) {
            self.list.push({
                id: id,
                date: date
            });
        });

        id++;
    });

    this.list.sort(function(a, b) {
        return a.date - b.date;
    });

    this.update();
};

TrendScoreCalculator.prototype.update = function() {
    var self = this;

    this.list.forEach(function(tag) {
        if (self.average === 0 && self.averageSqr === 0) {
            self.average = tag.id;
            self.averageSqr = Math.pow(tag.id, 2);

            return;
        }

        self.average = self.average * self.decay + tag.id * (1 - self.decay);
        self.averageSqr = self.averageSqr * self.decay + (Math.pow(tag.id, 2)) * (1 - self.decay);
    });
};

TrendScoreCalculator.prototype.getTrends = function(limit) {
    var derivation = this.getDerivation();
    var self = this;

    this.tags.forEach(function(tag) {
        tag.score = self.getScore(derivation, tag.id);
    });

    this.tags.sort(function(a, b) {
        return a.score - b.score;
    }).reverse();

    return this.tags.slice(0, limit);
};

TrendScoreCalculator.prototype.getScore = function(derivation, id) {
    return derivation == 0
        ? (id - this.average) * Number.POSITIVE_INFINITY
        : (id - this.average) / derivation;
};

TrendScoreCalculator.prototype.getDerivation = function() {
    return Math.sqrt(this.averageSqr - Math.pow(this.average, 2));
};

var tsc = new TrendScoreCalculator(getRandomTags(100), 0.8);
var trends = tsc.getTrends(10);
console.log(trends);
