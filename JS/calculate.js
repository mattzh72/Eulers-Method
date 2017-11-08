var step;
var derivEquation;
var x;
var y;
var finalX;
var nextY;
var slope;
var parenthesis = 'keep';
var implicit = 'hide';
var points = [];
var yPoints = [];
var xPoints = [];
var fractions = true;
var precision = 14;

function setVars(e) {
    if (e.keyCode == 13) {
        preload();
    }
}

function preload(){
    reset();
    step = math.eval(document.getElementById("step").value);
    derivEquation = document.getElementById("diff-eq").value;
    x = math.eval(document.getElementById("x").value);
    y = math.eval(document.getElementById("y").value);
    finalX = math.eval(document.getElementById("finalX").value);
    nextY = y;
        
    if (step == 0){
        document.getElementById("err-msg").innerHTML = "Stupidity Error: Are you really about to set your step size as 0?  Good luck closing this tab...you can thank me later.";
        return;
    }    
    calculateLite(); //do this first because it's dependent on the initial x, y values
    calculate();
    calculateError();
}

function reset(){
    points = []; //reset points array      
    betterPoints = []; //reset points array
    yPoints = [];
    yPointsLite = [];
    errorData = [];
    xPoints = [];

    var canvas = document.getElementById("eulerChart");
    canvas.remove(0);
    var canvasContainer = document.getElementById("chart-container");
    canvasContainer.innerHTML = "<canvas id='eulerChart' width='250px' height='200px'> </canvas>";
    ctx = document.getElementById("eulerChart");
    
    var errorCanvas = document.getElementById("errorChart");
    errorCanvas.remove(0);
    var errorCanvasContainer = document.getElementById("error-chart-container");
    errorCanvasContainer.innerHTML = "<canvas id='errorChart' width='250px' height='200px'> </canvas>";
    errorCtx = document.getElementById("errorChart");
    
    document.getElementById("err-msg").innerHTML = "";
    document.getElementById("notif-msg").innerHTML = "";
    
    var outputTable = document.getElementById('output');
    var rowCount = outputTable.rows.length;
    while (--rowCount) outputTable.deleteRow(rowCount); //destroys table
}

function calculate() {
    var start = x;
    for (var i = start; x < finalX; i++) {
        yPoints.push(y);
        xPoints.push(x);
        try {
            slope = math.eval(derivEquation,
            scope = {
                x: x,
                y: y
            });
        }
        catch(err){
            document.getElementById("err-msg").innerHTML = "Fatal Error: At some point, your function has evaluated to an undefined value.  Probably a divide by 0 error, but you should be more careful.";
            makeChart();
            calculateError();
            makeErrorChart;
            return;
        }
        nextY = math.add(nextY, math.multiply(slope, step));
        addNewRow(i);
        points.push(new point(x, y));
        x = math.add(x, step);
        y = nextY;
    }
    yPoints.push(y);
    xPoints.push(x);
    points.push(new point(x, y));
    makeChart();
}

function addNewRow(iter) {
    var table = document.getElementById("output");
    var row = table.insertRow();
    var derivEq = row.insertCell(0);
    var nextYEq = row.insertCell(1);

    prettyPrintEverything(derivEq, nextYEq, iter);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}

function latexify(s, b) {
    if (b === true) s = printRatio(s);

    var node = math.parse(s);
    return node ? node.toTex({
        parenthesis: parenthesis,
        implicit: implicit
    }) : '';
}

function prettyPrintEverything(derivCell, nextYCell, iterNum) {
    var derivReplace = derivEquation.replace("x", " " + printRatio(x) + " ").replace("y", " " + printRatio(y) + " ");
    while (derivReplace.includes("x")){
        derivReplace = derivReplace.replace("x", " " + printRatio(x) + " ");
    }
    
    while (derivReplace.includes("y")){
        derivReplace = derivReplace.replace("y", " " + printRatio(y) + " ");
    }
    
    derivCell.innerHTML = '<p1>$$' + "y'(" + latexify(x, true) + "," + latexify(y, true) + ") = " + latexify(derivReplace, false) + " = " + latexify(slope, true) + '$$</p1>';

    var subNum = (iterNum+1);
    nextYCell.innerHTML = '<p1>$$' + "y_{"+ (subNum) + "}=" + latexify(y, true) + " + (" + latexify(slope, true) + ")" + latexify(step, true) + " = " + latexify(nextY, true) + '$$</p1>';
}

function printRatio(value) {
    if (fractions == true){
        var valFraction;

        try {
            if (value == "Infinity") throw "Fatal Error: Your function approaches infinity too quickly!  Your computer is not sufficiently advanced enough to handle numbers of this scale.";
            if (math.isNaN(value)) throw "Fatal Error: At some point, your function has evaluated to an undefined value.  Probably a divide by 0 error, but you should be more careful.";
            valFraction = math.fraction(value);
        }
        catch(err){
            document.getElementById("err-msg").innerHTML = err;
            makeChart();
            calculateError();
            makeErrorChart;
        }

        if (value != 0){
            if (valFraction.d === 1){
                return math.format(value, {precision: precision}); //rounding errors
            }

            return math.format(valFraction, {
                fraction: 'ratio'
            });
        }

        return 0;
    }
    else if (fractions==false){
        return math.format(value, {precision: precision});
    }
}

function getPrecision(e){
    if (e.keyCode == 13) {
        document.getElementById("err-msg").innerHTML = "";
        precision = document.getElementById("prec").value;
        if (precision > 14){ 
            document.getElementById("err-msg").innerHTML = "Fatal Error: Why do you need so much precision? Buy yourself a supercomputer.";
            precision = 14;
        }
        else if (precision < 1){
            document.getElementById("err-msg").innerHTML = "Fatal Error: How can you have 0 or negative precision?";
            precision = 1;
        }
        document.getElementById("notif-msg").innerHTML = "Precision set to " + precision;
        
        preload();
    }
}


