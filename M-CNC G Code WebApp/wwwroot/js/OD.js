
document.getElementById("GCodeOD").addEventListener('click', GCodeOD);


function extractDataOD() {

    var material = document.getElementById('materialOD');
    var option = material.options[material.selectedIndex].value;
    localStorage.setItem('speed', option)
    

    // option 1 is ss
    if (option == 1) {
        var speed = 200
    }

    // 2 is mild
    else if (option == 2) {
        var speed = 350
    }

    // 3 is alu
    else {
        var speed = 500
    }

  

    var data = new Object();
    var data = {

         // Rapid Point
         ODxValueRP: document.getElementById('ODxValueRP').value.trim(),
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
        ODxValueODE: document.getElementById('ODxValueODE').value,
        ODsValue: speed
       
       
    }
    
    return data
}




function GCodeOD() {
    


    data = extractDataOD();
    

    if (checkData(data)) {
        safeStart = "N01M98P7000\n"
        toolOffset = "T0101\n"
        surfaceSpeed = "G96 S" + data["ODsValue"] + "M3P11\n"
        rapidStart = "G0 X" +  data["ODxValueRP"] + " Z1.0 M8\n"
        odStart = "G1G42 Z0.0 F0.1\n"
        intersection1 = ",A90,R0.2\n"
        intersection2 = ",A " + data["ODaValueI2"] + "X" +  data["ODxValueI2"] + "Z-" +  data["ODzValueI2"] + "\n"
        intersection3 = "Z-" +  data["ODzValueI3"] + "\n"
        intersection4 = ",A" + data["ODaValueI4"] + " U-" +  data["ODxValueI4"] + "\n"
        intersection5 = "Z-" +  data["ODzValueI5"] + "\n"
        odEnd = "G0 X" +  data["ODxValueODE"] + "\n"
        subSafeStart = "M98P7000\n"
        optionalStop = "M1\n"

        let ODGCodeArray = [safeStart, toolOffset, surfaceSpeed, rapidStart, odStart, intersection1, intersection2, intersection3, intersection4, intersection5, odEnd, subSafeStart, optionalStop]
        json = JSON.stringify(ODGCodeArray)
        localStorage.setItem('GCode', json);
        

        partnumber = document.getElementById('partno').value;
        localStorage.setItem('partno', partnumber)

        $('.bd-example-modal-sm').modal('show');   
        document.getElementById("ODContinue").style.visibility = 'visible';
        
    }
    

}

