
var Shapes = (function (display, shapes) {

    /**
     * @description - base class for Canvas and Pieces
     * @param position
     * @param size
     * @param color
     * @constructor
     */
    function Rectangle(position, size, color) {
        this.position = position;
        this.size = size;
        this.color = color;
        this.parent = null;
    }

    /**
     * @description - add this rectangle to parent
     * @param parent
     */
    Rectangle.prototype.addToParent = function (parent) {
        if (this.parent !== null) {
            throw 'it already has a parent / cant have 2 parents'
        }

        this.parent = parent;
        this.element = display.addRectangle(this.parent, this.position, this.size, this.color);
    };

    /**
     * @description - remove this rectangle from parent
     */
    Rectangle.prototype.removeFromParent = function () {
        if (this.parent === null) {
            throw 'first, it must have a parent'
        }

        display.removeChildFromParent(this.element, this.parent);
    };


    /**
     * @description - Canvas class extends the Rectangle class
     * @param position
     * @param size
     * @param color
     * @constructor
     */
    function Canvas(position, size, color) {
        this.children = [];
        Rectangle.apply(this, [position, size, color]);
    }

    Canvas.prototype = new Rectangle();
    Canvas.prototype.constructor = Canvas;

    /**
     * @description - adding it to main layer
     */
    Canvas.prototype.addToMainLayer = function () {
        this.addToParent(display.getMainLayer());
    };

    /**
     * @description - creates and adds a Piece to canvas
     * @param position
     * @param size
     * @param color
     * @param onMouseEnterHandler
     * @param onMouseOutHandler
     * @returns {Piece}
     */
    Canvas.prototype.addChild = function (position, size, color, onMouseEnterHandler, onMouseOutHandler) {
        var child = new Piece(position, size, color);
        this.children.push(child);
        child.addToParent(this.element);
        child.onMouseEnter(onMouseEnterHandler);
        child.onMouseOut(onMouseOutHandler);
        return child;
    };

    /**
     * @description - removes a Piece from canvas
     * @param child
     */
    Canvas.prototype.removeChild = function (child) {
        if (child.constructor.name !== 'Piece') {
            throw 'Canvas does not accept other type of children besides Piece'
        }

        child.removeFromParent();

        var si = this.children.indexOf(child);
        this.children.splice(si, 1);
    };


    /**
     * @description - Piece class
     * @param position
     * @param size
     * @param color
     * @constructor
     */
    function Piece(position, size, color) {
        Rectangle.apply(this, [position, size, color]);
    }

    Piece.prototype = new Rectangle();
    Piece.prototype.constructor = Piece;

    /**
     * @description - sets the mouseEnter handler
     * @param handler
     */
    Piece.prototype.onMouseEnter = function (handler) {
        display.onMouseEnter(this.element, handler.bind(this))
    };

    /**
     * @description - set the mouseOut handler
     * @param handler
     */
    Piece.prototype.onMouseOut = function (handler) {
        display.onMouseOut(this.element, handler.bind(this))
    };

    /**
     * @description - changes the Piece position
     * @param position
     */
    Piece.prototype.changePosition = function (position) {
        this.position = position;
        display.setPosition(this.element, position);
    };

    /**
     * @description - changes the Piece color
     * @param color
     */
    Piece.prototype.changeColor = function (color) {
        display.setColor(this.element, color);
    };

    /**
     * the public members of this namespace
     * @type {*|{}}
     */
    var public_object = shapes || {};

    var myCanvas = null;

    /**
     * createCanvas - allows the use to create one canvas
     * @param position
     * @param size
     * @param color
     */
    public_object['createCanvas'] = function (position, size, color) {
        myCanvas = new Canvas(position, size, color);
        myCanvas.addToMainLayer();
    }

    /**
     * addChildrenBaseOnStrategy - allows the user to add children to canvas base on a strategy
     * @param nChildren
     * @param strategy
     */
    public_object['addChildrenBaseOnStrategy'] = function (nChildren, strategy) {
        for (var i = 0; i < nRectangles; i++) {
            var childProto = strategy(i);
            if (childProto != null)
            {
                myCanvas.addChild(
                    childProto.position,
                    childProto.size,
                    childProto.color,
                    childProto.onMouseEnterRectangle,
                    childProto.onMouseOutRectangle
                );
            }
        }
    }

    public_object["removeChildFromCanvas"] = function (child) {
        myCanvas.removeChild(child);
    }

    return public_object;

})(DisplayHtml, Shapes);

