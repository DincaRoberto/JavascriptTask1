'use strict';

window.onload = function createInstance() {

    //measure the time
    var t = new Date().getTime();

    //define the mouse size
    var mouseSize = new Vector(1, 1);

    //time counter for mouse enter on a piece in canvas
    var onMouseEnterCounter = null

    //creating a canvas
    Shapes.createCanvas(
        new Vector(0, 0),
        new Vector(containerWidth, containerHeight),
        Randomize.getRandomColor()
    );

    //get a random position for a specific size
    var getRandomAvailablePosition = function (size) {
        var availableSpaces = HightMatrix.getAllAvailableSpacesForRectangle(size);
        console.log("Available positions: " + availableSpaces.length);
        if (availableSpaces.length == 0)
        {
            return null
        }
        var randomSpace = availableSpaces[Randomize.getRandomWithInterval(0, availableSpaces.length)]
        return randomSpace;
    }

    //on mouse enter start the counter
    var onMouseEnterRectangle = function (event) {
        console.log("onMouseEnterRectangle")
        if (onMouseEnterCounter != null) {
            clearTimeout(onMouseEnterCounter);
            onMouseEnterCounter = null
        }

        this.changeColor(Randomize.getRandomColor());

        onMouseEnterCounter = setTimeout(function()
        {
            HightMatrix.removeRectangle(this.position, this.size);

            var mousePosition = new Vector(this.position.x + event.offsetX, this.position.y + event.offsetY);

            HightMatrix.addRectangle(mousePosition, mouseSize);

            var randomSpace = getRandomAvailablePosition(this.size);

            HightMatrix.removeRectangle(mousePosition, mouseSize);

            if (randomSpace == null)
            {
                Shapes.removeChildFromCanvas(this)
            }
            else
            {
                this.changePosition(randomSpace);
                HightMatrix.addRectangle(randomSpace, this.size);
            }

            clearTimeout(onMouseEnterCounter);
            onMouseEnterCounter = null;
        }.bind(this), 3000)
    }

    //on mouse out reset the couter
    var onMouseOutRectangle = function (event) {
        console.log("onMouseOutRectangle")
        if (onMouseEnterCounter != null) {
            clearTimeout(onMouseEnterCounter);
            onMouseEnterCounter = null
        }
    }

    //creating canvas's children considering that each Piece must be create
    // with a random size and at a random available position
    Shapes.addChildrenBaseOnStrategy(
        nRectangles,
        function (index) {
            var size = Randomize.getRandomIntSize(minRectDim, maxRectDim);
            var position = getRandomAvailablePosition(size);

            if (position == null) {
                return null
            }

            HightMatrix.addRectangle(position, size);

            return{
                position:position,
                size:size,
                color:Randomize.getRandomColor(),
                onMouseEnterRectangle:onMouseEnterRectangle,
                onMouseOutRectangle:onMouseOutRectangle
            }
        }
    )

    //how much time took to create everything
    t = (new Date().getTime()) - t;
    console.log("Everything was created in: " + t + " ms");
};
