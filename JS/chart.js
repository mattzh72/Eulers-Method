var ctx;
var errorCtx;

function makeChart(){
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Your Approximation',
                data: points,
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgb(254, 229, 172)",
                borderColor: "rgb(254, 229, 172)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgb(254, 229, 172)",
                pointBackgroundColor: "rgba(254, 229, 172, 0.4)",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgb(254, 229, 172)",
                pointHoverBorderColor: "#fff",
                pointHoverBorderWidth: 2,
                pointRadius: 5,
                pointHitRadius: 10,
                spanGaps: false,
            },
            {
                label: 'Closer Approximation',
                data: betterPoints,
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgb(160, 231, 160)",
                borderColor: "rgb(160, 231, 160)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgb(160, 231, 160)",
                pointBackgroundColor: "rgba(160, 231, 160, 0.4)",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgb(160, 231, 160)",
                pointHoverBorderColor: "#fff",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 1,
                spanGaps: false,
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                }],
    
            },
            responsiveAnimationDuration: 1000
        },
        
    });
}

function makeErrorChart(){
    var chart = new Chart(errorCtx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Error',
                data: errorData,
                fill: true,
                lineTension: 0.1,
                backgroundColor: "rgba(255, 105, 97, 0.4)",
                borderColor: "rgb(255, 105, 97)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgb(255, 105, 97)",
                pointBackgroundColor: "rgba(255, 105, 97, 0.4)",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgb(255, 105, 97)",
                pointHoverBorderColor: "#fff",
                pointHoverBorderWidth: 2,
                pointRadius: 5,
                pointHitRadius: 10,
                spanGaps: false,
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                }],
    
            },
            responsiveAnimationDuration: 1000
        },
        
    });
}



