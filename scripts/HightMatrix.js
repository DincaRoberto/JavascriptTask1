/**
 * Created by Dinca on 9/12/2015.
 */


var HightMatrix = (function (mx, my) {

    var cMatrix = [];
    for (var i = 0; i < my; i++) {
        var r = [];
        for (var j = 0; j < mx; j++) {
            r.push(i + 1);
        }
        cMatrix.push(r);
    }


    var printMatrix = function () {
        for (var i = 0; i < my; i++) {
            var s = "";
            for (var j = 0; j < mx; j++) {
                if (cMatrix[i][j]<10)
                {
                    s += "  " + cMatrix[i][j];
                }
                else{
                    s += " " + cMatrix[i][j];
                }

            }
            console.log(s);
        }
    };

    var addRectangle = function (position, size) {
        for (var i = position.x; i < position.x + size.x; i++) {
            var r = position.y + size.y;
            var c = 0;
            while (r < cMatrix.length) {

                if (cMatrix[r][i] != 0) {
                    c++;
                    cMatrix[r][i] = c;
                }
                else
                    break;
                r++;
            }
        }

        for (var i = position.x; i < position.x + size.x; i++) {
            for (var j = position.y; j < position.y + size.y; j++) {
                cMatrix[j][i] = 0;
            }
        }
    };

    var removeRectangle = function(position, size)
    {

        for (var i = position.x; i < position.x + size.x; i++) {
            for (var j = position.y; j < position.y + size.y; j++) {
                cMatrix[j][i] = 1;
            }
        }

        for (var i = position.x; i < position.x + size.x; i++) {
            var r = position.y;
            var c = 0;
            if (r > 0){
                c = cMatrix[r-1][i]
            }

            while (r < cMatrix.length) {

                if (cMatrix[r][i] != 0) {
                    c++;
                    cMatrix[r][i] = c;
                }
                else
                    break;
                r++;

            }
        }
    };

    var getAllAvailableSpacesForRectangle = function (size)
    {
        var result = [];
        for(var i=size.y-1; i<cMatrix.length; i++)
        {
            for(var j=0; j<cMatrix[0].length-size.x+1;j++)
            {
                if (cMatrix[i][j]!=0)
                {
                    if (cMatrix[i][j] >= size.y)
                    {
                        var checkH = 0;
                        while(checkH < size.x)
                        {
                            if (cMatrix[i][j+checkH] >= size.y){
                                checkH++;
                            }
                            else
                            {
                                break;
                            }
                        }
                        if (checkH == size.x)
                        {
                            result.push(new Vector(j, i-size.y+1));
                        }

                    }

                }
            }
        }

        return result;
    }

    return {
        printMatrix:printMatrix,
        addRectangle:addRectangle,
        removeRectangle:removeRectangle,
        getAllAvailableSpacesForRectangle:getAllAvailableSpacesForRectangle
    }
})(containerWidth, containerHeight)