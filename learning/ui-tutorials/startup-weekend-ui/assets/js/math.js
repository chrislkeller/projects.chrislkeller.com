
function calculateDegree(lat1, lon1, lat2, lon2){

    var delta_x = lat1 - lat2;
    var delta_y = lon1 - lon2;
    var radians = Math.atan2(delta_x, delta_y);

    return radians * (180/3.1415) 
}

//console.log(calculateDegree(43.564472,-89.945068, 43.586359,-90.072784));
//console.log(calculateDegree(44.253069,-89.494629, 43.413029,-89.472656));
//console.log(calculateDegree(43.413029,-89.472656, 44.253069,-89.494629));


//console.log(calculateDegree(43.413029,-89.472656, 44.111254,-88.59375));
//console.log(calculateDegree(43.413029,-89.472656, 44.024422,-90.692139));

//console.log(calculateDegree(44.111254,-88.59375,43.413029,-89.472656));

console.log(calculateDegree(43.035034,-89.501778, 43.034942,-89.502696));
var value = calculateDegree(43.035034,-89.501778, 43.034942,-89.502696);
var rotation = 360 - (360 + 90 - value) ; 

console.log(rotation);
