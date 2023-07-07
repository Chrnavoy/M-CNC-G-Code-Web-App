
document.getElementById("GCodeID").addEventListener('click', GCodeID);


function extractDataID() {

    var option = localStorage.getItem('speed')
    
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
        IDxValueRP: document.getElementById('IDxValueRP').value.trim(),
        // intersection 1
        IDxValueI1: document.getElementById('IDxValueI1').value.trim(),
        // Intersection 2
        IDzValueI2: document.getElementById('IDzValueI2').value.trim(),
        // Intersection 3
        IDxValueI3: document.getElementById('IDxValueI3').value.trim(),
        // Intersection 4
        IDzValueI4: document.getElementById('IDzValueI4').value.trim(),
        // ID End
        IDxValueIDE: document.getElementById('IDxValueIDE').value.trim(),
        IDsValue: speed
        

    }

    return data
}


function GCodeID() {

    data = extractDataID();
   
    if (checkData(data)) {
        start = "\nN03\n"
        safeStart = "M98P7000\n"
        offSet = "T0303\n"
        speed = "G96 S" + data["IDsValue"] + "M3 P11\n"
        rapidStart = "G0 X" + data["IDxValueRP"] + " Z1.0 M8\n"
        idStart = "G1G41 Z0.05 F0.1\n"
        intersection1 = "X" + data["IDxValueI1"] + " Z0.0" + ",R0.2" +"\n" 
        intersection2 = "Z-" + data["IDzValueI2"] + "\n"
        intersection3 = "X" + data["IDxValueI3"] + "\n"
        intersection4 = "Z-" + data["IDzValueI4"] + "\n"
        idEnd = "X" + data["IDxValueIDE"] + "\n"
        rapidEnd = "G0 Z1.0\n"
        subSafeStart = "M98P7000\n"
        optionalStop = "M1\n"

        let IDGCodeArray = [start, safeStart, offSet, speed, rapidStart, idStart, intersection1, intersection2, intersection3, intersection4, idEnd, rapidEnd, subSafeStart, optionalStop]
       
        var savedArray = JSON.parse(localStorage.getItem('GCode'));
        var combined = savedArray.concat(IDGCodeArray)
        localStorage.setItem('GCode', JSON.stringify(combined));

        $('.bd-example-modal-sm').modal('show');
        document.getElementById("IDContinue").style.visibility = 'visible';

        
    }

}
