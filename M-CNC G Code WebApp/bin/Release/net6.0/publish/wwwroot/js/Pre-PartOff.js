document.getElementById("GCodePPO").addEventListener("click", GCodePPO);


function extractDataPPO() {

    var material = document.getElementById('materialPPO');
    var option = material.options[material.selectedIndex].value;
    var partno = document.getElementById("partnoPPO").value;
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
        // Rapid start1
        PPOxValueRS1: document.getElementById('PPOxValueRS1').value,
        // Start point 1
        PPOzValueSP1: document.getElementById('PPOzValueSP1').value,
        // end point 
        PPOxValueEP: document.getElementById('PPOxValueEP').value,
        // start point 2
        PPOxValueSP2: document.getElementById('PPOxValueSP2').value,
        // rapid start 2
        PPOxValueRS2: document.getElementById('PPOxValueRS2').value,
        PPOsValue: speed,
        partno, partno
        
    }

    return data
}


function GCodePPO() {

    data = extractDataPPO();
    if (checkData(data)) {

        start = "N07M98P7000\n"
        offSet = "T0707\n"
        speed = "G96 S" + data["PPOsValue"] + "M3P11\n"
        rapidStart1 = "G0 X" + data["PPOxValueRS1"] + " Z1.0 M8\n"
        start1 = "Z" + data["PPOzValueSP1"] + "\n"
        endPoint1 = "G01 X" + data["PPOxValueEP"] + " F0.04\n"
        start2 = "G0 X" + data["PPOxValueSP2"] + "\n"
        rapidStart2 = "Z" + data["PPOxValueRS2"] + "\n"
        subSafeStart = "M98P7000\n"
        optionalStop = "M1"

       
        let PPOGCodeArray = [start, offSet, speed, rapidStart1, start1, endPoint1, start2, rapidStart2, subSafeStart, optionalStop]
        PPOGCode = PPOGCodeArray.join("")

        download(PPOGCode, data["partno"])
    }
}
