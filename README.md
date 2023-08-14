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

### Self Hosting
To host your own service. First clone the repo, and cd into it. 

```console
$ git clone https://github.com/Saatvik-Lochan/WebGestureCaptureBackend.git
$ cd WebGestureCaptureBackend
```

Then run

```console
$ npm install
```

Since it is written in typsecript, we must first compile it with


Since the service is a [node.js](https://nodejs.org/en) server, you can 
run it in production with 

```console
$ NODE_ENV=production node src/index.ts
```

### HTTPS
HTTPS is required for this service to work with [WebGestureCapture](https://github.com/Saatvik-Lochan/WebGestureCapture).
You can easily get your own certificate with [LetsEncrypt](https://letsencrypt.org/).

## API
The API presented by this service is defined in [`openapi.yaml`](src/openapi.yaml) or a markdown version at [`openapi.md`](src/openapi.md). 

## Expansion
You are encouraged to fork this 