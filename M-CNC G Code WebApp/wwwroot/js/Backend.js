function convertToFloat(data) {
    // Convert the number to a floating point number with 2 decimal places.

    following0 = '.00'
    // Decimals are break i.e. 4.0 return 4.0.00
    console.log(data)

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

function checkData(data) {

    for (var key in data) {

        if (isEmpty(data[key])) {
            continue;
        }

        else {

            $('.false-bd-example-modal-sm').modal('show');
            return false;
        }
    }
    return true;
}


function isEmpty(value) {
    // Check if value is empty.

    console.log(value, value.length)
    if (value == null || value.length == 0) {
        return false
    }
    else
        return true
       
}
    
    

function convertAngle(data) {

    // Convert angle to have a leading 0 if under 100.

    if (data.length == 2) {

        angle = data.toString().padStart(3, '0')
        return angle;
    }

    else if (data.length == 1) {

        angle = data.toString().padStart(3, '0')
        return angle;
    }

    else {
        return data
    }
    
}

function download(data, title) {
    
    var a = document.createElement('a')
    var blob = new Blob([data], { type: 'text/plain' })
    var url = URL.createObjectURL(blob)
    a.setAttribute('href', url)
    a.setAttribute('download', title + '.nc')
    a.click()

    delete GCode;
}




