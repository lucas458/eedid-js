Math.clamp = (value, min, max) => {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}; 

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


// https://blog.danman.eu/emulating-hdmi-connection/
// https://en.wikipedia.org/wiki/Extended_Display_Identification_Data
// https://glenwing.github.io/docs/VESA-EEDID-A2.pdf

var EDID = [
    0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x00,     0x10, 0xAC, 0x7A, 0xA0, 0x53, 0x36, 0x37, 0x30,
    0x30, 0x17, 0x01, 0x03, 0x80, 0x34, 0x20, 0x78,     0xEA, 0xEE, 0x95, 0xA3, 0x54, 0x4C, 0x99, 0x26,
    0x0F, 0x50, 0x54, 0xA1, 0x08, 0x00, 0x81, 0x40,     0x81, 0x80, 0xA9, 0x40, 0xB3, 0x00, 0xD1, 0xC0,
    0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x28, 0x3C,     0x80, 0xA0, 0x70, 0xB0, 0x23, 0x40, 0x30, 0x20,
    0x36, 0x00, 0x06, 0x44, 0x21, 0x00, 0x00, 0x1A,     0x00, 0x00, 0x00, 0xFF, 0x00, 0x30, 0x46, 0x46,
    0x58, 0x44, 0x33, 0x42, 0x53, 0x30, 0x37, 0x36,     0x53, 0x0A, 0x00, 0x00, 0x00, 0xFC, 0x00, 0x44,
    0x45, 0x4C, 0x4C, 0x20, 0x55, 0x32, 0x34, 0x31,     0x32, 0x4D, 0x0A, 0x20, 0x00, 0x00, 0x00, 0xFD,
    0x00, 0x32, 0x3D, 0x1E, 0x53, 0x11, 0x00, 0x0A,     0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x00, 0x34
];




const digitalInputBitDepth          = ["undefined", "6", "8", "10", "12", "14", "16", "reserved"];
const digitalInputVideoInterface    = ["undefined", "DVI", "HDMIa", "HDMIb", "DisplayPort"];
const analogInputWhiteAndSync       = ["+0.7/-0.3 V", "+0.714/-0.286 V", "+1.0/-0.4 V", "+0.7/0 V (EVC)"];
const displayColorTypeDigital       = ["RGB 4:4:4", "RGB 4:4:4 + YCrCb 4:4:4", "RGB 4:4:4 + YCrCb 4:2:2", "RGB 4:4:4 + YCrCb 4:4:4 + YCrCb 4:2:2"];
const displayColorTypeAnalog        = ["monochrome/grayscale", "RGB color", "non-RGB color", "undefined"];
const aspectRatioList               = ["16:10", "4:3", "5:4", "16:9"];




const establishedTimingBitmapList = [

    [
        "720x400 @ 70 Hz (VGA)",
        "720x400 @ 88 Hz (XGA)",
        "640x480 @ 60 Hz (VGA)",
        "640x480 @ 67 Hz (Apple Macintosh II)",
        "640x480 @ 72 Hz",
        "640x480 @ 75 Hz",
        "800x600 @ 56 Hz",
        "800x600 @ 60 Hz"
    ],

    [
        "800x600 @ 72 Hz",
        "800x600 @ 75 Hz",
        "832x624 @ 75 Hz (Apple Macintosh II)",
        "1024x768 @ 87 Hz, interlaced (1024x768i)",
        "1024x768 @ 60 Hz",
        "1024x768 @ 70 Hz",
        "1024x768 @ 75 Hz",
        "1280x1024 @ 75 Hz"
    ],

    [
        "1152x870 @ 75 Hz (Apple Macintosh II)",
        "Other manufacturer-specific display modes"
    ]

];



const stereoModeList = [
    
    [
        "Field sequential stereo, right image when stereo sync signal = 1",
        "Field sequential stereo, left image when stereo sync signal = 1",
        "4-way interleaved stereo"
    ],
    [
        "2-way interleaved stereo, right image on even lines",
        "2-way interleaved stereo, left image on even lines",
        "Side-by-Side interleaved stereo",
    ],
    [
        "Normal Display - No Stereo"
    ]

];






function dataToASCII( value = 0, charToBlank = '.' ){
    if ( value >= 32 && value <= 126 ){
        return String.fromCharCode(value);
    }
    return charToBlank;
}

function dataToHex( value = 0, leadingZeroAmount = 2 ){
    return ( ("0").repeat(leadingZeroAmount)  + value.toString(16)).substr(-leadingZeroAmount).toUpperCase();
}





function generaMemory( buffer = [] ){
    const memorySize = buffer.length;
    const bytesPerRow = 16;
    const maxRows = parseInt(memorySize / bytesPerRow);
    hexview.innerHTML = '';

    for (let rowIndex = 0; rowIndex < maxRows; rowIndex++){

        const hexview_row = document.createElement("div");
        hexview_row.classList.add("hexview_row");

        hexview_row.innerHTML = `
        <div class="hexview_address">${dataToHex(rowIndex * bytesPerRow, 8)}</div>
        <div class="hexview_separator"></div>
        <div class="hexview_data_container hexview_data_container_hex"></div>
        <div class="hexview_separator"></div>
        <div class="hexview_data_container hexview_data_container_ascii"></div>`;   

        for (let byteIndex = 0; byteIndex < bytesPerRow; byteIndex++){
            const hexview_data_hex   = document.createElement("div");
            const hexview_data_ascii = document.createElement("div");

            hexview_data_hex.classList.add("hexview_data");
            hexview_data_ascii.classList.add("hexview_data");

            const bufferDataIndex = (rowIndex * bytesPerRow) + byteIndex;
            const bufferDataValue = buffer[bufferDataIndex];

            hexview_data_hex.innerHTML   = dataToHex(bufferDataValue , 2);
            hexview_data_ascii.innerHTML = dataToASCII(bufferDataValue);

            hexview_row.querySelector(".hexview_data_container_hex").appendChild(hexview_data_hex);
            hexview_row.querySelector(".hexview_data_container_ascii").appendChild(hexview_data_ascii);

            hexview_data_hex.onmousemove = hexview_data_ascii.onmousemove = (event) => {
                const isHexBlock = event.srcElement.parentElement.classList.contains("hexview_data_container_hex");
                const indexBlock = isHexBlock ? 1 : 0; 
                hexview_row.querySelectorAll(".hexview_data_container")[indexBlock].children[byteIndex].classList.add("hexview_data_pseudoHover");
            };

            hexview_data_hex.onmouseout = hexview_data_ascii.onmouseout = () => {
                document.querySelectorAll(".hexview_data_pseudoHover").forEach(e => e.classList.remove("hexview_data_pseudoHover"));
            };

            hexview_data_hex.onclick = hexview_data_ascii.onclick = () => {
                onDataClicked(bufferDataIndex, bufferDataValue);
            };

        }

        hexview.appendChild(hexview_row);

    }

}








function getManufactureID( data = 0x0000 ){
    let manufacturerID = [];
    manufacturerID.push(String.fromCharCode(64  + (data >> 10 & 0x1F) ));
    manufacturerID.push(String.fromCharCode(64  + (data >> 5 & 0x1F) ));
    manufacturerID.push( String.fromCharCode(64 + (data & 0x1F) )); 
    return manufacturerID.join("");
}


function getVersionEDID( data = 0x0000 ){
    return (data >> 8) + '.' + (data & 0xFF);
}


function getVideoInput( data = 0x00 ){
    
    if ( data & 1 << 7 ){
        return {
            isDigital:      true,
            bitDepth:       digitalInputBitDepth[(data & 0x70) >> 4],
            videoInterface: digitalInputVideoInterface[data & 0x07]
        };
    }

    return {
        isDigital:              false,
        whiteAndSync:           analogInputWhiteAndSync[data >> 6],
        blankToBlack:           Boolean(data & 1 << 4),
        separateSync:           Boolean(data & 1 << 3),
        compositeSync:          Boolean(data & 1 << 2),
        syncOnGreen:            Boolean(data & 1 << 1),
        VSyncOrSyncOnGreesUsed: Boolean(data & 1 << 0)
    };

}


function getDisplayColor( isDigital = true, data = 0x00 ){
    const index = (data & 0x18) >> 3;
    return isDigital ? displayColorTypeDigital[index] : displayColorTypeAnalog[index];
}


function getScreenSize( dataHorizontal, dataVertical ){
    return {
        horizontal: dataHorizontal,
        verical:    dataVertical
    };
}


function getBitmapFeatures( isDigital = true, data = 0x00 ){
    const displayColor = getDisplayColor(isDigital, data);

    return {
        standbyDPMS:                Boolean(data & 1 << 7),
        suspendDPMS:                Boolean(data & 1 << 6),
        activeOffDPMS:              Boolean(data & 1 << 5),
        displayColor:               displayColor,
        standard_sRGB:              Boolean(data & 1 << 2),
        timingMode:                 Boolean(data & 1 << 1),
        continuousTimingsGTF_CVT:   Boolean(data & 1 << 0),
    };

}


function getChromaticityCoordinates( coordinates = [] ){
    
    // Red 10 bits
    const redX10    = coordinates[2] << 2 | (coordinates[0] >> 6);
    const redY10    = coordinates[3] << 2 | ((coordinates[0] & 0x30) >> 4);
    // Green 10 bits
    const greenX10  = coordinates[4] << 2 | ((coordinates[0] & 0x0C) >> 2);
    const greenY10  = coordinates[5] << 2 | ((coordinates[0] & 0x03));
    // Blue 10 bits
    const blueX10   = coordinates[6] << 2 | (coordinates[1] >> 6);
    const blueY10   = coordinates[7] << 2 | ((coordinates[1] & 0x30) >> 4);
    // White 10 bits
    const whiteX10  = coordinates[8] << 2 | ((coordinates[1] & 0x0C) >> 2);
    const whiteY10  = coordinates[9] << 2 | ((coordinates[1] & 0x03));

    return {
        red: {
            x: redX10/1024,
            y: redY10/1024
        },
        green: {
            x: greenX10/1024,
            y: greenY10/1024
        },
        blue: {
            x: blueX10/1024,
            y: blueY10/1024
        },
        white: {
            x: whiteX10/1024,
            y: whiteY10/1024
        }
    };

}



function getEstablishedTimingBitmap( supportedBitmap = [] ){
    let tempList = [];
    
    for (let i = 0; i < 2; i++){
        for (let bit = 0; bit < 8; bit++){
            if ( supportedBitmap[i] & 1 << (7-bit) ){ 
                tempList.push( establishedTimingBitmapList[i][bit] );
            }
        }
    }

    if ( supportedBitmap[2] & 1 << 7 ){
        tempList.push(establishedTimingBitmapList[2][0]); 
    }
    
    if ( supportedBitmap[2] & 0x7F ){
        tempList.push(establishedTimingBitmapList[2][1]); 
    }

    return tempList; 
}



function getStandardTiming(data = 0x0000, isPriorVersion1_3 = false ){
    const standardTimingData = data & 0xFF;
    const aspectRatioIndex = (standardTimingData & 0xC0) >> 6;
    const vericalFrequency = (standardTimingData & 0x3F) + 60;

    return {
        xResolution:        ((data >> 8) + 31) * 8,
        aspectRatio:        (aspectRatioIndex == 0 && isPriorVersion1_3)? "1:1" : aspectRatioList[aspectRatioIndex],
        vericalFrequency:   vericalFrequency
    };
}


function getStandardTimingList( standardTimingDataList = [], isPriorVersion1_3 = false ){
    let standardTimingList = [];

    for (let i = 0; i < 8; i++){

        if ( standardTimingDataList[2*i] == 0x01 && standardTimingDataList[2*i+1] == 0x01 ){
            continue;
        }

        const standardTiming = getStandardTiming(standardTimingDataList[2*i] << 8 | standardTimingDataList[2*i+1], isPriorVersion1_3);
        standardTimingList.push(standardTiming);
    }

    return standardTimingList;
}









function getSyncType( data = 0x00 ){


        console.warn(data)

    let syncType = {
        isDigital: Boolean(data & 1 << 4)
    };
    

    if ( syncType.isAnalog ){

        syncType.isDigitalCompositeSync = Boolean(data & 1 << 3);

        if ( syncType.isDigitalCompositeSync ){
            syncType.serrations = Boolean(data & 1 << 2);
            return syncType;
        }

        syncType.verticalSyncIsPositive = Boolean(data & 1 << 2);
        syncType.horizontalSyncIsPositive = Boolean(data & 1 << 1);
        return syncType;

    }
        
    syncType.isAnalogBipolarComposite = Boolean(data & 1 << 3);
    
    if ( syncType.isAnalogBipolarComposite ){
        syncType.serrations = Boolean(data & 1 << 2);
        syncType.syncOnGreen = Boolean(data & 1 << 1);
    }

    return syncType;
    
}


function getDescriptorList( descriptorDataList = [] ){
    let descriptorList = [];
    let adddress = 0;

    for (let i = 0; i < 4; i++){

        const tempData = descriptorDataList.slice(adddress, adddress+17+1);

        if ( i == 0 ){
            const stereoModeCode = (tempData[17] & 0x60) >> 5;

            descriptorList.push({
                pixelClock: (tempData[1] << 8 | tempData[0]) * 10000,
                horizontalActive: ((tempData[4] & 0xF0) << 4) | tempData[2],
                horizontalBlanking: ((tempData[4] & 0x0F) << 4) | tempData[3],
                vericalActive: ((tempData[7] & 0xF0) << 4) | tempData[5],
                verticalBlanking: ((tempData[7] & 0x0F) << 4) | tempData[6],
                horizontalSyncOffset: ((tempData[11] & 0xC0) << 2) | tempData[8],
                horizontalSyncPulse: ((tempData[11] & 0x30) << 4) | tempData[9],
                verticalSyncOffset: ((tempData[11] & 0x0C) << 2) | (tempData[10] >> 4),
                verticaSyncPulse: ((tempData[11] & 0x03) << 4) | (tempData[10] & 0x0F),
                horizontalDisplaySize: ((tempData[14] & 0xF0) << 4) | tempData[12],
                verticalDisplaySize: ((tempData[14] & 0x0F) << 8) | tempData[13],
                horizontalBorder: tempData[15],
                verticalBorder: tempData[16],
                interlaced: Boolean(tempData[17] & 1 << 7),
                stereoMode: stereoModeCode == 0 ? stereoModeList[2][0] : stereoModeList[ tempData[17] & 0x01 ][stereoModeCode],
                syncType: getSyncType(tempData[17])
            });
        }else{
            descriptorList.push( tempData );
        }

        adddress += 18;
    }
    
    return descriptorList;
}




function getEDID( buffer = [] ){

    // Header information
    const fixedHeader               = buffer.slice(0, 7+1).toString() == [0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x00].toString();
    const manufacturerID            = getManufactureID( buffer[8] << 8 | buffer[9] );
    const manufacturerProductCode   = dataToHex(buffer[11] << 8 | buffer[10], 4);
    const serialNumber              = (buffer[15] << 24) | (buffer[14] << 16) | (buffer[13] << 8) | buffer[12]; //buffer.slice(12, 15+1);
    const weekOfManufacture         = buffer[16];
    const yearOfManufacture         = buffer[17] + 1990;
    const versionEDID               = getVersionEDID(buffer[18] << 8 | buffer[19]);
    

    // Basic display parameters
    const videoInput                = getVideoInput( buffer[20] );
    const screenSize                = getScreenSize(buffer[21], buffer[22]);
    const displayGamma              = buffer[23] / 100 + 1;
    const bitmapFeatures            = getBitmapFeatures(videoInput.isDigital, buffer[24]);
    

    // Chromaticity coordinates.
    const chromaticityCoordinates   = getChromaticityCoordinates( buffer.slice(25, 34+1) );


    // Established timing bitmap. Supported bitmap for (formerly) very common timing modes.
    const establishedTimingBitmap   = getEstablishedTimingBitmap( buffer.slice(35, 37+1) );

    
    // Standard timing information. Up to 8 2-byte fields describing standard display modes.
    // Unused fields are filled with 01 01 hex. The following definitions apply in each record:
    const standardTiming            = getStandardTimingList( buffer.slice(38, 53+1) );


    // Display timing descriptor followed by display/monitor descriptors
    //const preferredTimingDescriptor = buffer.slice(52, 71+1);
    const descriptor                = getDescriptorList( buffer.slice(54, 125+1) );


    // Extension flag and checksum
    const extensionsToFollow        = buffer[126];
    const checksum                  = "0x" + dataToHex(buffer[127]);


    // Sum and Test Zero
    const sumData                   = buffer.reduce((a, b) => a + b, 0);
    const checksumIsValid            = sumData % 256 == 0;


    return {
        fixedHeader:                fixedHeader,
        manufacturerID:             manufacturerID,
        manufacturerProductCode:    manufacturerProductCode,
        serialNumber:               serialNumber,
        weekOfManufacture:          weekOfManufacture,
        yearOfManufacture:          yearOfManufacture,
        versionEDID:                versionEDID,
        videoInput:                 videoInput,
        screenSize:                 screenSize,
        displayGamma:               displayGamma,
        bitmapFeatures:             bitmapFeatures,
        chromaticityCoordinates:    chromaticityCoordinates,
        establishedTimingBitmap:    establishedTimingBitmap,
        standardTiming:             standardTiming,
        descriptor:                 descriptor,
        extensionsToFollow:         extensionsToFollow,
        checksum:                   checksum,
        sumData:                    sumData,
        checksumIsValid:             checksumIsValid
    };

}






function generaSummaryByEDID( obj ){
    console.log(obj);
    summary_data.innerHTML = JSON.stringify(obj, null, 2);
    setScreenSummaryView(true);
}




summaryClose.onclick = () => {
    setScreenSummaryView(false);
    summary_data.innerHTML = '';
};






function setScreenSummaryView( state ){
    summary_screen.style.display = state ? 'flex' : 'none';
}


function setModalView( state ){
    modalEdit.style.display = state ? 'flex' : 'none';
    if ( state ){
        document.getElementsByName("typeValue")[0].checked = true;
        modalEditContentInput.focus();
    }
}




function onModalCancel(){
    currentAddressToEdit = -1;
    setModalView(false);
}



function onModalSave(){

    if ( modalEditContentInput.value.length > 0 ){
        const hexInputSelected = document.getElementsByName("typeValue")[0].checked;
        const newData = hexInputSelected ? parseInt(modalEditContentInput.value, 16) : parseInt(modalEditContentInput.value);
        setMemoryData(currentAddressToEdit, newData);
        currentAddressToEdit = -1;
        setModalView(false);
    }

}




modalEditContentInput.onkeydown = (event) => {

    if ( event.key.length > 1 || event.shiftKey || event.ctrlKey || event.altKey ){
        if ( event.key == 'Enter' ){
            onModalSave();
        }
        return;
    }

    modalEditContentInput.value = modalEditContentInput.value.trim();
    const keyCode               = event.key.toUpperCase().charCodeAt(0);
    const hexInputSelected      = document.getElementsByName("typeValue")[0].checked;
    const isValidLetter         = keyCode >= 65 && keyCode <= 70;
    const isNumber              = keyCode >= 48 && keyCode <= 59;
    
    if ( (!isValidLetter && !isNumber) || (!isNumber && !hexInputSelected) ){
        event.preventDefault();
    }

};



modalEditContentInput.oninput = () => {
    modalEditContentInput.value = modalEditContentInput.value.toUpperCase();
};



function onDataClicked( index, value ){
    currentAddressToEdit = index;
    modalEditContentInput.value = dataToHex(value , 2);
    modalEditHeader.innerHTML = `Edit (0x${dataToHex(value , 2)}) ${index}`;
    setModalView(true);
}



document.getElementsByName("typeValue").forEach(e => {
    e.onchange = () => {
        const isHex = e.value == 'hex';
        modalEditContentInput.maxLength = isHex ? 2 : 3;
        modalEditContentInput.value = '';
        modalEditContentInput.focus();
    };
});



function setMemoryData( address, data ){
    address = Math.clamp(address, 0, EDID.length);
    data    = Math.clamp(data, 0, 255);
    EDID[address] = data;

    document.querySelectorAll(".hexview_data_container_hex .hexview_data")[address].innerHTML = dataToHex(data);
    document.querySelectorAll(".hexview_data_container_ascii .hexview_data")[address].innerHTML = dataToASCII(data);

}








button_generateSummary.onclick = () => {
    generaSummaryByEDID( getEDID(EDID) );
};


button_random.onclick = () => {
    EDID = EDID.map(e => getRandomInt(0, 256));
    generaMemory(EDID);
};


button_clear.onclick = () => { 
    EDID = Array(EDID.length).fill(0);
    generaMemory(EDID); 
};


onload = () => {             
    generaMemory(EDID);
};