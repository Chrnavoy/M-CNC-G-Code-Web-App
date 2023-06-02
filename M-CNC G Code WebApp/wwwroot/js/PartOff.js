
document.getElementById("GCodePO").addEventListener("click", GCodePO);


function extractDataPO() {

    var option = localStorage.getItem('speed')

    // option 1 is ss
    if (option == 1) {
        var speed = 80
    }

    // 2 is mild
    else if (option == 2) {
        var speed = 200
    }

    // 3 is alu
    else {
        var speed = 200
    }
    
    var data = new Object();

    var data = {
        // Rapid start
        POxValueRS1: document.getElementById('POxValueRS1').value,
        POzValueRS1: document.getElementById('POzValueRS1').value,
        // Plunge Start 1
        POxValuePS1: document.getElementById('POxValuePS1').value,
        // Plunge End
        POxValuePE: document.getElementById('POxValuePE').value,
        // Plunge Start 2
        POxValuePS2: document.getElementById('POxValuePS2').value,
        // Slow Spindle
        POxValueSS: document.getElementById('POxValueSS').value,
        // Part Off End
        POxValuePOE: document.getElementById('POxValuePOE').value,
        // Rapid Start
        POxValueRS2: document.getElementById('POxValueRS2').value,
        POsValue: speed,
        
    }

    return data
}


function GCodePO() {

    data = extractDataPO();
    if (checkData(data)) {

        start = "N03M98P7000\n"
        offSet = "T0303\n"
        speed = "G96 S" + data["POsValue"] + "M3P11\n"
        rapidStart = "G0 X" + data["POxValueRS1"] + "Z" +data["POzValueRS1"] + " M8\n"
        pStart1 = "X" + data["POxValuePS1"] + "\n"
        pEnd = "G01 X" + data["POxValuePE"] +" F0.1" +  "\n"
        pStart2 = "G0 X" + data["POxValuePS2"] + "\n"
        startPoint = "W1.0\n"
        featherStart = "G01 U-0.95\n"
        featherEnd = "U-0.05 W-1.0 R0.5\n"
        slowSpindle = "X" + data["POxValueSS"] + "\n"
        coolant = "M9\n"
        poEnd = "G97S300" + data["POxValuePOE"] + "F0.04M10\n"
        rapidStart2 = "G0 X" + data["POxValueRS2"] + "\n"
        subSafeStart = "M98P7000\n"
        optionalStop = "M1"

        let POGCodeArray = [start, offSet, speed, rapidStart, pStart1, pEnd, pStart2, startPoint, featherStart, featherEnd, slowSpindle, coolant, poEnd, rapidStart2, subSafeStart, optionalStop]

        var savedArray = JSON.parse(localStorage.getItem('GCode'));
        var combined = savedArray.concat(POGCodeArray)

        GCode = combined.join("")
       

        download(GCode, localStorage.getItem('partno'))

        localStorage.clear();
    }
}
