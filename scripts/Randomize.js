
var Randomize = Randomize || {};

Randomize.getRandomColor = function () {
    function c() {
        var r = Math.floor(Math.random() * 256).toString(16);
        if (r.length<2)
        {
            return "0"+r;
        }
        return r;
    }
    var result = "#" + c() + c() + c();
    return result
};

Randomize.getRandomInt = function (maxValue) {
    if (typeof maxValue !== 'number')
    {
        throw 'maxValue must be a number'
    }
    return Math.floor(Math.random() * maxValue);
};

Randomize.getRandomWithInterval = function (minValue, maxValue) {
    if (typeof minValue !== 'number')
    {
        throw 'minValue must be a number'
    }

    if (typeof maxValue !== 'number')
    {
        throw 'maxValue must be a number'
    }

    return minValue + Randomize.getRandomInt(maxValue - minValue);
};

Randomize.getRandomIntSize = function (min, max) {
    if (typeof min !== 'number')
    {
        throw 'min must be a number'
    }

    if (typeof max !== 'number')
    {
        throw 'max must be a number'
    }
    return new Vector(
        Randomize.getRandomWithInterval(min, max),
        Randomize.getRandomWithInterval(min, max)
    )
};

Randomize.getRandomIntPosition = function (minPosition, maxPosition) {
    if (minPosition.constructor.name !== 'Vector')
    {
        throw 'minPosition must be a Vector'
    }

    if (maxPosition.constructor.name !== 'Vector')
    {
        throw 'maxPosition must be a Vector'
    }

    return new Vector(
        Randomize.getRandomWithInterval(minPosition.x, maxPosition.x),
        Randomize.getRandomWithInterval(minPosition.y, maxPosition.y)
    )
};