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

Before you can run the application, you must first create a `.env` file.
See [HTTPS and Environment](#https-and-environment) on details before continuing.

Since the service is a [node.js](https://nodejs.org/en) server with typescript
and ESModules, you can run it with 

```console
$ ts-node-esm --transpile-only src/index.ts
```

This should be sufficient in most use cases. However if the typing overheads
are undesirable you will have to change the imports, from
`.mts` to `.mjs`, change `tsconfig.json` to emit the build 
files, compile with typescript
and run a node server with `NODE_ENV=production` on the resulting files.

#### HTTPS and Environment
HTTPS is required for this service to work with [WebGestureCapture](https://github.com/Saatvik-Lochan/WebGestureCapture).
You can easily get your own certificate with [LetsEncrypt](https://letsencrypt.org/).

Once you have your certificate and private key, create a `.env` file

```console
$ touch .env
```

Open the file in your editor of choice

```console
$ sudo nano .env
```

Then ensure your file looks like this
```env
TOKEN_KEY=<token>
SSL_CERTIFICATE=<ssl certificate>
SSL_KEY=<ssl key>
USE_CERTIFICATE=true
```

Populate  

## API
The API presented by this service is defined in [`openapi.yaml`](src/openapi.yaml) or a markdown version at [`openapi.md`](src/openapi.md). 

## Expansion
You are encouraged to fork this repo to add your own features.
Most of the code has [JSDoc](https://jsdoc.app/) annotations
which should help you on your way.

You can build in development easier by first installing nodemon
```console
$ npm install --save-dev nodemon
```

Then you can run
```console
$ npm run build
```

The server will now be live, and will update with any changes.