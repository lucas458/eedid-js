# eedid-js
Dados de EEDID para JSON

[Exemplo de EEPROM](https://blog.danman.eu/emulating-hdmi-connection/)

[EDID Wikipedia](https://en.wikipedia.org/wiki/Extended_Display_Identification_Data)

[EEDID VESA](https://glenwing.github.io/docs/VESA-EEDID-A2.pdf)

### Exemplo de saída
```json
{
  "fixedHeader": true,
  "manufacturerID": "DEL",
  "manufacturerProductCode": "A07A",
  "serialNumber": 808924755,
  "weekOfManufacture": 48,
  "yearOfManufacture": 2013,
  "versionEDID": "1.3",
  "videoInput": {
    "isDigital": true,
    "bitDepth": "undefined",
    "videoInterface": "undefined"
  },
  "screenSize": {
    "horizontal": 52,
    "verical": 32
  },
  "displayGamma": 2.2,
  "bitmapFeatures": {
    "standbyDPMS": true,
    "suspendDPMS": true,
    "activeOffDPMS": true,
    "displayColor": "RGB 4:4:4 + YCrCb 4:4:4",
    "standard_sRGB": false,
    "timingMode": true,
    "continuousTimingsGTF_CVT": false
  },
  "chromaticityCoordinates": {
    "red": {
      "x": 0.6396484375,
      "y": 0.330078125
    },
    "green": {
      "x": 0.2998046875,
      "y": 0.599609375
    },
    "blue": {
      "x": 0.150390625,
      "y": 0.0595703125
    },
    "white": {
      "x": 0.3134765625,
      "y": 0.3291015625
    }
  },
  "establishedTimingBitmap": [
    "720x400 @ 70 Hz (VGA)",
    "640x480 @ 60 Hz (VGA)",
    "800x600 @ 60 Hz",
    "1024x768 @ 60 Hz"
  ],
  "standardTiming": [
    {
      "xResolution": 1280,
      "aspectRatio": "4:3",
      "vericalFrequency": 60
    },
    {
      "xResolution": 1280,
      "aspectRatio": "5:4",
      "vericalFrequency": 60
    },
    {
      "xResolution": 1600,
      "aspectRatio": "4:3",
      "vericalFrequency": 60
    },
    {
      "xResolution": 1680,
      "aspectRatio": "16:10",
      "vericalFrequency": 60
    },
    {
      "xResolution": 1920,
      "aspectRatio": "16:9",
      "vericalFrequency": 60
    }
  ],
  "descriptor": [
    {
      "pixelClock": 154000000,
      "horizontalActive": 1920,
      "horizontalBlanking": 160,
      "vericalActive": 1200,
      "verticalBlanking": 35,
      "horizontalSyncOffset": 48,
      "horizontalSyncPulse": 32,
      "verticalSyncOffset": 3,
      "verticaSyncPulse": 6,
      "horizontalDisplaySize": 518,
      "verticalDisplaySize": 324,
      "horizontalBorder": 0,
      "verticalBorder": 0,
      "interlaced": false,
      "stereoMode": "Normal Display - No Stereo",
      "syncType": {
        "isDigital": true,
        "isAnalogBipolarComposite": true,
        "serrations": false,
        "syncOnGreen": true
      }
    },
    [
      0,
      0,
      0,
      255,
      0,
      48,
      70,
      70,
      88,
      68,
      51,
      66,
      83,
      48,
      55,
      54,
      83,
      10
    ],
    [
      0,
      0,
      0,
      252,
      0,
      68,
      69,
      76,
      76,
      32,
      85,
      50,
      52,
      49,
      50,
      77,
      10,
      32
    ],
    [
      0,
      0,
      0,
      253,
      0,
      50,
      61,
      30,
      83,
      17,
      0,
      10,
      32,
      32,
      32,
      32,
      32,
      32
    ]
  ],
  "extensionsToFollow": 0,
  "checksum": "0x34",
  "sumData": 9216,
  "checksumIsValid": true
}
```
