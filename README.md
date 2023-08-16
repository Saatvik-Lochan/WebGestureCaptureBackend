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

Since the service is a [node.js](https://nodejs.org/en) server with typescript, you must first build it with

```console
$ npm run build 
```

which just runs the typscript compiler. Then simply run 

```console
$ npm run prod
```


#### HTTPS and Environment
HTTPS is required for this service to work with [WebGestureCapture](https://github.com/Saatvik-Lochan/WebGestureCapture).
You can easily get your own certificate with [LetsEncrypt](https://letsencrypt.org/).

Once you have your certificate and private key, create a `.env` file in 
the root directory of the repository.

```console
$ touch .env
```

Open the file in your editor of choice

```console
$ sudo nano .env
```

Then ensure your file looks like this
```sh
# The key used to encrypt user passwords. This can be any random string
TOKEN_KEY=<token>

# Path to SSL certificate
SSL_CERTIFICATE=<ssl-certificate>

# Path to SSL private key
SSL_KEY=<ssl-key>

# Whether to use SSL. It is required to be `true` if you are running
# this in conjunction with a WebXR frontend
USE_CERTIFICATE=true

# A standard chron schedule format for when to run cleanup.
# Comment this out to never run cleanup
CLEANUP_SCHEDULE="0 3 * * * *"

# How long an unused project lasts before it is deleted, in days.
# Comment this out to never delete projects
PROJECT_LIFE_DAYS=365

# How long recorded gesture data lasts before it is deleted, in days. 
# Comment this out to not delete any gesture data
DATA_LIFE_DAYS=3

# The production environment variable
NODE_ENV=production
```

Switch out `<token>`, `<ssl-certificate>` and `<ssl-key>` with your own.

## API
The API presented by this service is defined in [`openapi.yaml`](src/openapi.yaml) or a markdown version at [`openapi.md`](src/openapi.md). 

## Expansion
You are encouraged to fork this repo to add your own features.
Most of the code has [JSDoc](https://jsdoc.app/) annotations
which should help you on your way.

You can build in development easier by first installing nodemon, if it 
is not already installed.

```console
$ npm install --save-dev nodemon
```

Ensure you change the `NODE_ENV` environment variable in your `.env` file
to `development`. 

Then you can run
```console
$ npm run dev
```

The server will now be live, and will update with any changes.