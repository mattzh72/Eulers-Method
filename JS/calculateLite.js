var xL;
var yL;
var finalXL;
var nextYL;
var slopeL;
var stepL;
var betterPoints = [];
var yPointsLite = [];
var errorData = [];

function calculateLite() {
    xL = x;
    yL = y;
    finalXL = finalX;
    nextYL = nextY;
    slopeL = slope;
    stepL = step;
    
    var numberOfCalculations = finalXL/stepL;
    
    if (numberOfCalculations > 1000) stepL = step/3;
    else if (numberOfCalculations > 500) stepL = step/5;
    else if (numberOfCalculations > 250) stepL = step/7;
    else stepL = 0.01;
    
    var match = Math.round(step/stepL);
    var start = x;

    for (var i = start; xL < finalXL; i++) {
        if (i%match == 0) yPointsLite.push(yL);

        try {
            if (math.isNaN(math.eval(derivEquation,scope = {x: xL,y: yL}))) throw "Fatal Error: At some point, your function has evaluated to an undefined value.  Probably a divide by 0 error, but you should be more careful.";
            slopeL = math.eval(derivEquation,
            scope = {
                x: xL,
                y: yL
            });
        }
        catch(err){
            document.getElementById("err-msg").innerHTML = err;
            makeChart();
            calculateError();
            makeErrorChart;
            return;
        }
        
        nextYL = math.add(nextYL, math.multiply(slopeL, stepL));
        betterPoints.push(new point(xL, yL));
        xL = math.add(xL, stepL);
        yL = nextYL;
    }

    if (i%match == 0){
        yPointsLite.push(yL);
    }
    betterPoints.push(new point(xL, yL));
}


function calculateError(){
    for (var i=0; i < yPointsLite.length && i < yPoints.length && i < xPoints.length; i++){
        errorData.push(new point(xPoints[i],Math.abs(yPointsLite[i]-yPoints[i])));
    }
    makeErrorChart();
}


