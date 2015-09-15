/**
 * Created by Dinca on 9/5/2015.
 */

var DisplayHtml = (function () {

    var addStyle = function (elem, prop, value) {
        elem.style[prop] = value;
    };

    var addStyleDim = function (elem, prop, value) {
        addStyle(elem, prop, value + "px");
    };

    var setPosition = function (element, position) {

        if (!(element instanceof HTMLElement)) {
            throw 'element must be HTMLElement'
        }

        if (!(position instanceof Vector)) {
            throw 'position must be a Vector'
        }

        addStyleDim(element, 'top', position.y);
        addStyleDim(element, 'left', position.x);
    };

    var setSize = function (element, size) {

        if (!(element instanceof HTMLElement)) {
            throw 'element must be HTMLElement'
        }

        if (!(size instanceof Vector)) {
            throw 'size must be a Vector'
        }

        addStyleDim(element, 'width', size.x);
        addStyleDim(element, 'height', size.y);
    };

    var setColor = function (element, color) {

        if (!(element instanceof HTMLElement)) {
            throw 'element must be HTMLElement'
        }

        if (typeof color !== 'string' || color[0] != '#') {
            throw 'color must be a valid color'
        }

        element.style.backgroundColor = color;
    };

    var addRectagle = function (parent, position, size, color) {

        if (!(parent instanceof HTMLElement)) {
            throw 'parent must be HTMLElement'
        }

        if (!(position instanceof Vector)) {
            throw 'position must be a Vector'
        }

        if (!(size instanceof Vector)) {
            throw 'size must be a Vector'
        }

        if (typeof color !== 'string' || color[0] != '#') {
            throw 'color must be a valid color'
        }

        var s = document.createElement('div');

        addStyle(s, 'position', 'absolute');

        setPosition(s, position);
        setSize(s, size);
        setColor(s, color);

        parent.appendChild(s);

        return s
    };

    var onMouseEnter = function (element, handler) {

        if (!(element instanceof HTMLElement)) {
            throw 'element must be an html element'
        }

        if (typeof handler !== 'function') {
            throw 'handler must be a function'
        }

        element.onmouseenter = handler
    };

    var onMouseOut = function (element, handler) {

        if (!(element instanceof HTMLElement)) {
            throw 'element must be an html element'
        }

        if (typeof handler !== 'function') {
            throw 'handler must be a function'
        }

        element.onmouseout = handler
    };

    var getMainLayer = function () {
        return document.body;
    };

    var removeChildFromParent = function (child, parent) {

        if (!(child instanceof HTMLElement)) {
            throw 'child must be an html element'
        }

        if (!(parent instanceof HTMLElement)) {
            throw 'parent must be an html element'
        }

        parent.removeChild(child);
    };

    return {
        addRectangle: addRectagle,
        onMouseEnter: onMouseEnter,
        onMouseOut: onMouseOut,
        getMainLayer: getMainLayer,
        removeChildFromParent: removeChildFromParent,
        setPosition: setPosition,
        setColor: setColor
    }
})();

