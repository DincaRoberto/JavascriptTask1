
function Vector(x, y)
{
    if (typeof x !== 'number')
    {
        throw 'x must be a number'
    }

    if (typeof y !== 'number')
    {
        throw 'y must be a number'
    }

    this.x = x;
    this.y = y;
}