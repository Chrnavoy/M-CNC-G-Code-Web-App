
document.getElementById("GCodeSG").addEventListener("click", GCodeSG);


function extractDataSG() {

    var material = document.getElementById('materialSG');
    var option = material.options[material.selectedIndex].value;
    var partno = document.getElementById("partnoSG").value;
    console.log(option)

    // option 1 is ss
    if (option == 1) {
        var speed = 100
    }

    // 2 is mild
    else if (option == 2) {
        var speed = 200
    }

    // 3 is alu
    else {
        var speed = 350
    }


    var data = new Object();

    var data = {
        // Rapid start
        SGxValueRS: document.getElementById('SGxValueRS').value,
        // start point 1
        SGzValueSP1: document.getElementById('SGzValueSP1').value,
        // Groove 1
        SGxValueG1: document.getElementById('SGxValueG1').value,
        // Bore 1
        SGxValueB1: document.getElementById('SGxValueB1').value,
        // Rapid Point 1
        SGxValueRP1: document.getElementById('SGxValueRP1').value,
        // Start Point 2
        SGzValueSP2: document.getElementById('SGzValueSP2').value,
        // Groove 2
        SGxValueG2: document.getElementById('SGxValueG2').value,
        // Bore 2
        SGxValueB2: document.getElementById('SGxValueB2').value,
        // Rapid Point 2
        SGxValueRP2: document.getElementById('SGxValueRP2').value,
        SGsValue: speed,
        partno: partno

    }

    return data
}



function GCodeSG() {

    data = extractDataSG();
    if (checkData(data)) {

        safeStart = "N21M98P7000\n"
        toolOffset = "T2121\n"
        surfaceSpeed = "G96 S" + data["SGsValue"] + "M3P11\n"
        rapidStart = "G0 X" + data["SGxValueRS"] + " Z1.0 M8\n"
        start1 = "Z-" + data["SGzValueSP1"] + "\n"
        groove1 = "G01 X" + data["SGxValueG1"] + " F0.02\n"
        bore1 = "X" + data["SGxValueB1"] + " R0.4F0.04\n"
        endPoint1 = "U-0.03 W-0.6\n"
        rapidPoint1 = "G0 X" + data["SGxValueRP1"] + "\n"
        start2 = "W" + data["SGzValueSP2"] + "\n"
        groove2 = "G01 X" + data["SGxValueG2"] + "\n"
        bore2 = "X" + data["SGxValueB2"] + " R0.4" +"\n"
        endPoint2 = "U-0.03 W-0.6\n"
        rapidPoint2 = "G0 X" + data["SGxValueRP2"] +"\n"
        subSafeStart = "M98P7000\n"
        optionalStop = "M1"

        let SGGCodeArray = [safeStart, toolOffset, surfaceSpeed, rapidStart, start1, groove1, bore1, endPoint1, rapidPoint1, start2, groove2, bore2, endPoint2, rapidPoint2, subSafeStart, optionalStop]
        SGGCode = SGGCodeArray.join("")

        download(SGGCode, data["partno"])
    }
}

