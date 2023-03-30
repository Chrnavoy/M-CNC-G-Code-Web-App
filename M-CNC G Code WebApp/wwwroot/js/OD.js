function extractData() {

    var data = new Object();

    var data = {
         // Rapid Point
         ODxValueRP: document.getElementById('ODxValueRP').value,
         // Intersection 2
         ODxValueI2: document.getElementById('ODxValueI2').value,
         ODzValueI2: document.getElementById('ODzValueI2').value,
         ODaValueI2: document.getElementById('ODaValueI2').value,
         // Intersection 3
         ODzValueI3: document.getElementById('ODzValueI3').value,
         // Intersection 4
         ODxValueI4: document.getElementById('ODxValueI4').value,
         ODaValueI4: document.getElementById('ODaValueI4').value,
         // Intersection 5
         ODzValueI5: document.getElementById('ODzValueI5').value,
         // End
         ODxValueODE: document.getElementById('ODxValueODE').value

    }
   
    return data
}

function convertToFloat(data) {
    for (var key in data) {
        let convert = data[key]
        float = parseFloat(convert)
        fixed = float.toFixed(2)
        data[key] = fixed
        console.log(data[key])
    }
}


function GCodeOD() {

    data = extractData();
    convertToFloat(data);

    safeStart = "N01M98P7000"
    toolOffset = "T0101"
    surfaceSpeed = "G96 S" + "M3P11"
    rapidStart = "G0 X" + data["ODxValueRP"] + " Z1.0 M8"
    odStart = "G1G42 Z0.0 F0.1"
    intersection1 = ",A90,R0.2"
    intersection2 = ",A" + "X" + "Z-"
    intersection3 = "Z-"
    intersection4 = ",A" + "U-"
    intersection5 = "Z-"
    odEnd = "G0 X"
    subSafeStart = "M98P7000"
    optionalStop = "M1"
    
    console.log(rapidStart)

}

function download() {
    GCodeOD()
}