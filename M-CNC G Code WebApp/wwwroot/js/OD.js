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


    following0 = '.00'
    // Decimals are break i.e. 4.0 return 4.0.00

    if (data.length == 1) {

        number = data.toString().padStart(2, '0')
        float = number.concat(following0)
        return float
    }
    else {

        float = data.concat(following0)
        return float
    }
}

function convertAngle(data) {

    if (data.length == 2) {
 
        angle = data.toString().padStart(3, '0')
        console.log(angle)
        return angle;
    }

    else if (data.length == 1) {
        angle = data.toString().padStart(3, '0')
        console.log(angle)
        return angle;
    }

    else {
        console.log(data)
        return data
    }
    
}
    
   


function GCodeOD() {

    data = extractData();
    //convertToFloat(data);

    
    safeStart = "N01M98P7000\n"
    toolOffset = "T0101\n"
    surfaceSpeed = "G96 S" + "M3P11\n"
    rapidStart = "G0 X" + convertToFloat(data["ODxValueRP"]) + " Z1.0 M8\n"
    odStart = "G1G42 Z0.0 F0.1\n"
    intersection1 = ",A90,R0.2\n"
    intersection2 = ",A " + convertAngle(data["ODaValueI2"]) + "X" + convertToFloat(data["ODxValueI2"]) + "Z-" + convertToFloat(data["ODzValueI2"]) + "\n"
    intersection3 = "Z-" + convertToFloat(data["ODzValueI3"]) + "\n"
    intersection4 = ",A" + convertAngle(data["ODaValueI4"]) + " U-" + convertToFloat(data["ODxValueI4"]) + "\n"
    intersection5 = "Z-" + convertToFloat(data["ODzValueI5"]) + "\n"
    odEnd = "G0 X" + convertToFloat(data["ODxValueODE"]) + "\n"
    subSafeStart = "M98P7000\n"
    optionalStop = "M1"

    let ODGCodeArray = [safeStart, toolOffset, surfaceSpeed, rapidStart, odStart, intersection1, intersection2, intersection3, intersection4, intersection5, odEnd, subSafeStart, optionalStop]
    ODGCode = ODGCodeArray.join("")

    return ODGCode

}

function download() {
   gCode = GCodeOD()

  
    var a = document.createElement('a')
        var blob = new Blob([gCode], { type: 'text/plain' })
        var url = URL.createObjectURL(blob)
        a.setAttribute('href', url)
        a.setAttribute('download', 'gcode.txt')
        a.click()

        
    }
