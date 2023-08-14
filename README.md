# WebGestureCaptureBackend
The backend for capturing hand gesture data through a browser on a VR Headset.
See [GestureLogger](https://github.com/Saatvik-Lochan/GestureLogger) for more 
details.

This project is to be used in conjunction with:
 - Frontend: [WebGestureCapture](https://github.com/Saatvik-Lochan/WebGestureCapture)
 - Application: [GestureLogger](https://github.com/Saatvik-Lochan/GestureLogger)

 ## Installation and Usage
 You can use this service at https://gesturelogger.com:8000. Though we 
 recommend you host your own service along with hosting your own [frontend](https://github.com/Saatvik-Lochan/WebGestureCapture).

 ### HTTPS
HTTPS is required for this service to work with [WebGestureCapture](https://github.com/Saatvik-Lochan/WebGestureCapture).
You can easily get your own certificate with [LetsEncrypt](https://letsencrypt.org/).
 

## API
The API presented by this service is defined in [`openapi.yaml`](src/openapi.yaml). 