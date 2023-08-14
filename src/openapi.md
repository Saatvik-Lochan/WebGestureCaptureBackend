---
title: Gesture Logger API v1.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="gesture-logger-api">Gesture Logger API v1.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Base URLs:

* <a href="https://gesturelogger.com:8000">https://gesturelogger.com:8000</a>

<h1 id="gesture-logger-api-default">Default</h1>

## post__project_register

> Code samples

```shell
# You can also use wget
curl -X POST https://gesturelogger.com:8000/project/register \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST https://gesturelogger.com:8000/project/register HTTP/1.1
Host: gesturelogger.com:8000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "project_name": "string",
  "password": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('https://gesturelogger.com:8000/project/register',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post 'https://gesturelogger.com:8000/project/register',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('https://gesturelogger.com:8000/project/register', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://gesturelogger.com:8000/project/register', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://gesturelogger.com:8000/project/register");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://gesturelogger.com:8000/project/register", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /project/register`

Register a project with the server. The project name must not already be registered.

> Body parameter

```json
{
  "project_name": "string",
  "password": "string"
}
```

<h3 id="post__project_register-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ProjectRequest](#schemaprojectrequest)|false|none|

> Example responses

> 201 Response

```json
{
  "project_name": "string",
  "description": "string",
  "encryptedPass": "string",
  "participants": [
    {
      "participant_id": "string",
      "pendingTrials": [
        {
          "trial_id": "string",
          "trial_name": "string",
          "instructions": "string",
          "gestures": [
            {
              "gesture_id": "string",
              "gesture_name": "string",
              "instructions": "string",
              "duration": 0
            }
          ]
        }
      ],
      "completedTrials": [
        {
          "trial_id": "string",
          "trial_name": "string",
          "instructions": "string",
          "gestures": [
            {
              "gesture_id": "string",
              "gesture_name": "string",
              "instructions": "string",
              "duration": 0
            }
          ]
        }
      ],
      "urlCode": "string"
    }
  ],
  "token": "string"
}
```

> 400 Response

```
"Username and password both required"
```

<h3 id="post__project_register-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Project registered successfully|[Project](#schemaproject)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Request missing parameters|string|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|A Project with this name already exists|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unknown Server Error|None|

<aside class="success">
This operation does not require authentication
</aside>

## post__project_login

> Code samples

```shell
# You can also use wget
curl -X POST https://gesturelogger.com:8000/project/login \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST https://gesturelogger.com:8000/project/login HTTP/1.1
Host: gesturelogger.com:8000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "project_name": "string",
  "password": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('https://gesturelogger.com:8000/project/login',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post 'https://gesturelogger.com:8000/project/login',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('https://gesturelogger.com:8000/project/login', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://gesturelogger.com:8000/project/login', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://gesturelogger.com:8000/project/login");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://gesturelogger.com:8000/project/login", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /project/login`

Login to a server after you have registered. Returns a JWToken to use in requests which need authentication.

> Body parameter

```json
{
  "project_name": "string",
  "password": "string"
}
```

<h3 id="post__project_login-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ProjectRequest](#schemaprojectrequest)|false|none|

> Example responses

> 200 Response

```json
{
  "project_name": "string",
  "description": "string",
  "encryptedPass": "string",
  "participants": [
    {
      "participant_id": "string",
      "pendingTrials": [
        {
          "trial_id": "string",
          "trial_name": "string",
          "instructions": "string",
          "gestures": [
            {
              "gesture_id": "string",
              "gesture_name": "string",
              "instructions": "string",
              "duration": 0
            }
          ]
        }
      ],
      "completedTrials": [
        {
          "trial_id": "string",
          "trial_name": "string",
          "instructions": "string",
          "gestures": [
            {
              "gesture_id": "string",
              "gesture_name": "string",
              "instructions": "string",
              "duration": 0
            }
          ]
        }
      ],
      "urlCode": "string"
    }
  ],
  "token": "string"
}
```

<h3 id="post__project_login-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Credentials accepted, log in successful|[Project](#schemaproject)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Malformed Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid Credentials|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unknown Server Error|None|

<aside class="success">
This operation does not require authentication
</aside>

## post__participant_push-trial

> Code samples

```shell
# You can also use wget
curl -X POST https://gesturelogger.com:8000/participant/push-trial?token=string \
  -H 'Content-Type: application/json'

```

```http
POST https://gesturelogger.com:8000/participant/push-trial?token=string HTTP/1.1
Host: gesturelogger.com:8000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "participant_id": "string",
  "trial": {
    "trial_id": "string",
    "trial_name": "string",
    "instructions": "string",
    "gestures": [
      {
        "gesture_id": "string",
        "gesture_name": "string",
        "instructions": "string",
        "duration": 0
      }
    ]
  }
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('https://gesturelogger.com:8000/participant/push-trial?token=string',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.post 'https://gesturelogger.com:8000/participant/push-trial',
  params: {
  'token' => 'string'
}, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('https://gesturelogger.com:8000/participant/push-trial', params={
  'token': 'string'
}, headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://gesturelogger.com:8000/participant/push-trial', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://gesturelogger.com:8000/participant/push-trial?token=string");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://gesturelogger.com:8000/participant/push-trial", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /participant/push-trial`

Addss a trial to the specified Participant

> Body parameter

```json
{
  "participant_id": "string",
  "trial": {
    "trial_id": "string",
    "trial_name": "string",
    "instructions": "string",
    "gestures": [
      {
        "gesture_id": "string",
        "gesture_name": "string",
        "instructions": "string",
        "duration": 0
      }
    ]
  }
}
```

<h3 id="post__participant_push-trial-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|token|query|string|true|A JWToken provided on login|
|body|body|object|false|none|
|» participant_id|body|string|false|none|
|» trial|body|[Trial](#schematrial)|false|none|
|»» trial_id|body|string|true|none|
|»» trial_name|body|string|true|none|
|»» instructions|body|string|true|none|
|»» gestures|body|[[Gesture](#schemagesture)]|true|none|
|»»» gesture_id|body|string|true|none|
|»»» gesture_name|body|string|true|none|
|»»» instructions|body|string|true|none|
|»»» duration|body|number|true|none|

<h3 id="post__participant_push-trial-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Trial added successfully|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid token|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Missing token|None|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Trial of this id already exists|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unknown Server Error|None|

<aside class="success">
This operation does not require authentication
</aside>

## post__participant_remove-trial

> Code samples

```shell
# You can also use wget
curl -X POST https://gesturelogger.com:8000/participant/remove-trial?token=string \
  -H 'Content-Type: application/json'

```

```http
POST https://gesturelogger.com:8000/participant/remove-trial?token=string HTTP/1.1
Host: gesturelogger.com:8000
Content-Type: application/json

```

```javascript
const inputBody = '{
  "participant_id": "string",
  "trial_id": "string"
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('https://gesturelogger.com:8000/participant/remove-trial?token=string',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.post 'https://gesturelogger.com:8000/participant/remove-trial',
  params: {
  'token' => 'string'
}, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('https://gesturelogger.com:8000/participant/remove-trial', params={
  'token': 'string'
}, headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://gesturelogger.com:8000/participant/remove-trial', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://gesturelogger.com:8000/participant/remove-trial?token=string");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://gesturelogger.com:8000/participant/remove-trial", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /participant/remove-trial`

Removes a trial from a participant. From both its list of complete and incomplete trials

> Body parameter

```json
{
  "participant_id": "string",
  "trial_id": "string"
}
```

<h3 id="post__participant_remove-trial-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|token|query|string|true|A JWToken provided on login|
|body|body|object|false|none|
|» participant_id|body|string|false|none|
|» trial_id|body|string|false|none|

<h3 id="post__participant_remove-trial-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Trial removed successfully|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid token|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Missing token|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unknown server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## get__participant_{pid}_get-url

> Code samples

```shell
# You can also use wget
curl -X GET https://gesturelogger.com:8000/participant/{pid}/get-url?token=string \
  -H 'Accept: text/*'

```

```http
GET https://gesturelogger.com:8000/participant/{pid}/get-url?token=string HTTP/1.1
Host: gesturelogger.com:8000
Accept: text/*

```

```javascript

const headers = {
  'Accept':'text/*'
};

fetch('https://gesturelogger.com:8000/participant/{pid}/get-url?token=string',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'text/*'
}

result = RestClient.get 'https://gesturelogger.com:8000/participant/{pid}/get-url',
  params: {
  'token' => 'string'
}, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'text/*'
}

r = requests.get('https://gesturelogger.com:8000/participant/{pid}/get-url', params={
  'token': 'string'
}, headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'text/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://gesturelogger.com:8000/participant/{pid}/get-url', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://gesturelogger.com:8000/participant/{pid}/get-url?token=string");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"text/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://gesturelogger.com:8000/participant/{pid}/get-url", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /participant/{pid}/get-url`

Gets a urlCode from a participant id. A urlCode is  used to fetch participant specific information.

<h3 id="get__participant_{pid}_get-url-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|pid|path|string|true|The id of the participant whose URL must be fetched|
|token|query|string|true|A JWToken provided on login|

> Example responses

> 200 Response

<h3 id="get__participant_{pid}_get-url-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A urlCode, which is a string, which can be used  to access participant information|string|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid token|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Missing token|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unknown Server Error|None|

<aside class="success">
This operation does not require authentication
</aside>

## get__participant_get-completed-trials

> Code samples

```shell
# You can also use wget
curl -X GET https://gesturelogger.com:8000/participant/get-completed-trials?token=string \
  -H 'Accept: application/json'

```

```http
GET https://gesturelogger.com:8000/participant/get-completed-trials?token=string HTTP/1.1
Host: gesturelogger.com:8000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('https://gesturelogger.com:8000/participant/get-completed-trials?token=string',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://gesturelogger.com:8000/participant/get-completed-trials',
  params: {
  'token' => 'string'
}, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://gesturelogger.com:8000/participant/get-completed-trials', params={
  'token': 'string'
}, headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://gesturelogger.com:8000/participant/get-completed-trials', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://gesturelogger.com:8000/participant/get-completed-trials?token=string");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://gesturelogger.com:8000/participant/get-completed-trials", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /participant/get-completed-trials`

Get a list of trial ids. Each id representing a completed trial. It gets all completed trials from  all participants in the project

<h3 id="get__participant_get-completed-trials-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|token|query|string|true|A JWToken provided on login|

> Example responses

> 200 Response

```json
[
  "1",
  "3",
  "4"
]
```

<h3 id="get__participant_get-completed-trials-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Completed trials fetched successful|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid project from token|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid token|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Missing token|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unknown Server Error|None|

<h3 id="get__participant_get-completed-trials-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## get__participant_get-participants

> Code samples

```shell
# You can also use wget
curl -X GET https://gesturelogger.com:8000/participant/get-participants?token=string \
  -H 'Accept: application/json'

```

```http
GET https://gesturelogger.com:8000/participant/get-participants?token=string HTTP/1.1
Host: gesturelogger.com:8000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('https://gesturelogger.com:8000/participant/get-participants?token=string',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://gesturelogger.com:8000/participant/get-participants',
  params: {
  'token' => 'string'
}, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://gesturelogger.com:8000/participant/get-participants', params={
  'token': 'string'
}, headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://gesturelogger.com:8000/participant/get-participants', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://gesturelogger.com:8000/participant/get-participants?token=string");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://gesturelogger.com:8000/participant/get-participants", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /participant/get-participants`

Returns a list of participants in a project.

<h3 id="get__participant_get-participants-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|token|query|string|true|A JWToken provided on login|

> Example responses

> 200 Response

```json
[
  {
    "participant_id": "string",
    "pendingTrials": [
      {
        "trial_id": "string",
        "trial_name": "string",
        "instructions": "string",
        "gestures": [
          {
            "gesture_id": "string",
            "gesture_name": "string",
            "instructions": "string",
            "duration": 0
          }
        ]
      }
    ],
    "completedTrials": [
      {
        "trial_id": "string",
        "trial_name": "string",
        "instructions": "string",
        "gestures": [
          {
            "gesture_id": "string",
            "gesture_name": "string",
            "instructions": "string",
            "duration": 0
          }
        ]
      }
    ],
    "urlCode": "string"
  }
]
```

<h3 id="get__participant_get-participants-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|An array of Participants|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid token|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Missing token|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unknown Server Error|None|

<h3 id="get__participant_get-participants-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Participant](#schemaparticipant)]|false|none|none|
|» participant_id|string|true|none|none|
|» pendingTrials|[[Trial](#schematrial)]|true|none|none|
|»» trial_id|string|true|none|none|
|»» trial_name|string|true|none|none|
|»» instructions|string|true|none|none|
|»» gestures|[[Gesture](#schemagesture)]|true|none|none|
|»»» gesture_id|string|true|none|none|
|»»» gesture_name|string|true|none|none|
|»»» instructions|string|true|none|none|
|»»» duration|number|true|none|none|
|» completedTrials|[[Trial](#schematrial)]|true|none|none|
|» urlCode|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## get__trial_next-trial_{project_name}_{particiant_id}

> Code samples

```shell
# You can also use wget
curl -X GET https://gesturelogger.com:8000/trial/next-trial/{project_name}/{particiant_id} \
  -H 'Accept: application/json'

```

```http
GET https://gesturelogger.com:8000/trial/next-trial/{project_name}/{particiant_id} HTTP/1.1
Host: gesturelogger.com:8000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('https://gesturelogger.com:8000/trial/next-trial/{project_name}/{particiant_id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://gesturelogger.com:8000/trial/next-trial/{project_name}/{particiant_id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://gesturelogger.com:8000/trial/next-trial/{project_name}/{particiant_id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://gesturelogger.com:8000/trial/next-trial/{project_name}/{particiant_id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://gesturelogger.com:8000/trial/next-trial/{project_name}/{particiant_id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://gesturelogger.com:8000/trial/next-trial/{project_name}/{particiant_id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /trial/next-trial/{project_name}/{particiant_id}`

Fetches a pending trial from a participant. If there are many such trials, it returns the one that was  first pushed

<h3 id="get__trial_next-trial_{project_name}_{particiant_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|project_name|path|string|true|The name of the relevant project|
|particiant_id|path|string|true|The id of the relevant participant|

> Example responses

> 200 Response

```json
{
  "trial_id": "string",
  "trial_name": "string",
  "instructions": "string",
  "gestures": [
    {
      "gesture_id": "string",
      "gesture_name": "string",
      "instructions": "string",
      "duration": 0
    }
  ]
}
```

<h3 id="get__trial_next-trial_{project_name}_{particiant_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The next pending trial for the specified participant|[Trial](#schematrial)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|No pending trials|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unknown Server Error|None|

<aside class="success">
This operation does not require authentication
</aside>

## post__trial_complete-trial_{project_name}_{participant_id}_{trial_id}

> Code samples

```shell
# You can also use wget
curl -X POST https://gesturelogger.com:8000/trial/complete-trial/{project_name}/{participant_id}/{trial_id}

```

```http
POST https://gesturelogger.com:8000/trial/complete-trial/{project_name}/{participant_id}/{trial_id} HTTP/1.1
Host: gesturelogger.com:8000

```

```javascript

fetch('https://gesturelogger.com:8000/trial/complete-trial/{project_name}/{participant_id}/{trial_id}',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://gesturelogger.com:8000/trial/complete-trial/{project_name}/{participant_id}/{trial_id}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://gesturelogger.com:8000/trial/complete-trial/{project_name}/{participant_id}/{trial_id}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://gesturelogger.com:8000/trial/complete-trial/{project_name}/{participant_id}/{trial_id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://gesturelogger.com:8000/trial/complete-trial/{project_name}/{participant_id}/{trial_id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://gesturelogger.com:8000/trial/complete-trial/{project_name}/{participant_id}/{trial_id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /trial/complete-trial/{project_name}/{participant_id}/{trial_id}`

Marks the specified trial as complete. It will no  longer show up as a pending trial. It will now show up in the list of completed trials

<h3 id="post__trial_complete-trial_{project_name}_{participant_id}_{trial_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|project_name|path|string|true|The name of the relevant project|
|particiant_id|path|string|true|The id of the relevant participant|
|trial_id|path|string|true|The id of the relevant trial|

<h3 id="post__trial_complete-trial_{project_name}_{participant_id}_{trial_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Trial marked as complete|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unknown Server Error|None|

<aside class="success">
This operation does not require authentication
</aside>

## post__gesture-data_start-transfer

> Code samples

```shell
# You can also use wget
curl -X POST https://gesturelogger.com:8000/gesture-data/start-transfer \
  -H 'Content-Type: multipart/form-data'

```

```http
POST https://gesturelogger.com:8000/gesture-data/start-transfer HTTP/1.1
Host: gesturelogger.com:8000
Content-Type: multipart/form-data

```

```javascript
const inputBody = '{
  "project_name": "string",
  "participant_id": "string",
  "trial_id": "string",
  "gesture_index": 0
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('https://gesturelogger.com:8000/gesture-data/start-transfer',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'multipart/form-data'
}

result = RestClient.post 'https://gesturelogger.com:8000/gesture-data/start-transfer',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('https://gesturelogger.com:8000/gesture-data/start-transfer', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'multipart/form-data',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://gesturelogger.com:8000/gesture-data/start-transfer', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://gesturelogger.com:8000/gesture-data/start-transfer");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"multipart/form-data"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://gesturelogger.com:8000/gesture-data/start-transfer", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /gesture-data/start-transfer`

Starts the transfer of data for a specific gesture. This must be called before you can append data to that gesture. 

> Body parameter

```yaml
project_name: string
participant_id: string
trial_id: string
gesture_index: 0

```

<h3 id="post__gesture-data_start-transfer-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[GestureRequest](#schemagesturerequest)|false|none|

<h3 id="post__gesture-data_start-transfer-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Transfer started|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unknown server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## post__gesture-data_append-data

> Code samples

```shell
# You can also use wget
curl -X POST https://gesturelogger.com:8000/gesture-data/append-data \
  -H 'Content-Type: multipart/form-data'

```

```http
POST https://gesturelogger.com:8000/gesture-data/append-data HTTP/1.1
Host: gesturelogger.com:8000
Content-Type: multipart/form-data

```

```javascript
const inputBody = '{
  "project_name": "string",
  "participant_id": "string",
  "trial_id": "string",
  "gesture_index": 0,
  "data": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('https://gesturelogger.com:8000/gesture-data/append-data',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'multipart/form-data'
}

result = RestClient.post 'https://gesturelogger.com:8000/gesture-data/append-data',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('https://gesturelogger.com:8000/gesture-data/append-data', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'multipart/form-data',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://gesturelogger.com:8000/gesture-data/append-data', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://gesturelogger.com:8000/gesture-data/append-data");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"multipart/form-data"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://gesturelogger.com:8000/gesture-data/append-data", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /gesture-data/append-data`

Append data to the specified gesture. You must start the transfer  before this can be used

> Body parameter

```yaml
project_name: string
participant_id: string
trial_id: string
gesture_index: 0
data: string

```

<h3 id="post__gesture-data_append-data-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|any|false|none|

<h3 id="post__gesture-data_append-data-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Data received|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unknown Server Error. Transfer might not have been started.|None|

<aside class="success">
This operation does not require authentication
</aside>

## get__gesture-data_get-gesture_{participant_id}_{trial_id}_{gesture_index}

> Code samples

```shell
# You can also use wget
curl -X GET https://gesturelogger.com:8000/gesture-data/get-gesture/{participant_id}/{trial_id}/{gesture_index}?token=string \
  -H 'Accept: application/csv'

```

```http
GET https://gesturelogger.com:8000/gesture-data/get-gesture/{participant_id}/{trial_id}/{gesture_index}?token=string HTTP/1.1
Host: gesturelogger.com:8000
Accept: application/csv

```

```javascript

const headers = {
  'Accept':'application/csv'
};

fetch('https://gesturelogger.com:8000/gesture-data/get-gesture/{participant_id}/{trial_id}/{gesture_index}?token=string',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/csv'
}

result = RestClient.get 'https://gesturelogger.com:8000/gesture-data/get-gesture/{participant_id}/{trial_id}/{gesture_index}',
  params: {
  'token' => 'string'
}, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/csv'
}

r = requests.get('https://gesturelogger.com:8000/gesture-data/get-gesture/{participant_id}/{trial_id}/{gesture_index}', params={
  'token': 'string'
}, headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/csv',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://gesturelogger.com:8000/gesture-data/get-gesture/{participant_id}/{trial_id}/{gesture_index}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://gesturelogger.com:8000/gesture-data/get-gesture/{participant_id}/{trial_id}/{gesture_index}?token=string");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/csv"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://gesturelogger.com:8000/gesture-data/get-gesture/{participant_id}/{trial_id}/{gesture_index}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /gesture-data/get-gesture/{participant_id}/{trial_id}/{gesture_index}`

Download the .csv file in which the gesture data has been stored.  The file includes a header.

<h3 id="get__gesture-data_get-gesture_{participant_id}_{trial_id}_{gesture_index}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|token|query|string|true|A JWToken provided on login|
|particiant_id|path|string|true|The id of the relevant participant|
|trial_id|path|string|true|The id of the relevant trial|
|gesture_index|path|string|true|The zero-indexed position of the gesture in the trial with the specified trial_id|

> Example responses

> 200 Response

<h3 id="get__gesture-data_get-gesture_{participant_id}_{trial_id}_{gesture_index}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|CSV file with gesture data|string|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid token|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Missing token|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unknown Server Error|None|

<aside class="success">
This operation does not require authentication
</aside>

## get__demonstration_get-shortcode_{gesture_id}

> Code samples

```shell
# You can also use wget
curl -X GET https://gesturelogger.com:8000/demonstration/get-shortcode/{gesture_id}?token=string \
  -H 'Accept: text/*'

```

```http
GET https://gesturelogger.com:8000/demonstration/get-shortcode/{gesture_id}?token=string HTTP/1.1
Host: gesturelogger.com:8000
Accept: text/*

```

```javascript

const headers = {
  'Accept':'text/*'
};

fetch('https://gesturelogger.com:8000/demonstration/get-shortcode/{gesture_id}?token=string',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'text/*'
}

result = RestClient.get 'https://gesturelogger.com:8000/demonstration/get-shortcode/{gesture_id}',
  params: {
  'token' => 'string'
}, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'text/*'
}

r = requests.get('https://gesturelogger.com:8000/demonstration/get-shortcode/{gesture_id}', params={
  'token': 'string'
}, headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'text/*',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://gesturelogger.com:8000/demonstration/get-shortcode/{gesture_id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://gesturelogger.com:8000/demonstration/get-shortcode/{gesture_id}?token=string");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"text/*"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://gesturelogger.com:8000/demonstration/get-shortcode/{gesture_id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /demonstration/get-shortcode/{gesture_id}`

Gets the shortCode corresponding to the gesture class pointed to by  gesture_id and the token.

<h3 id="get__demonstration_get-shortcode_{gesture_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|gesture_id|path|string|true|The id of the relevant gesture class|
|token|query|string|true|A JWToken provided on login|

> Example responses

> 200 Response

<h3 id="get__demonstration_get-shortcode_{gesture_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The shortCode of the specified gesture|string|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid token|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Missing token|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unknown Server Error|None|

<aside class="success">
This operation does not require authentication
</aside>

## post__demonstration_start-transfer_{shortcode}

> Code samples

```shell
# You can also use wget
curl -X POST https://gesturelogger.com:8000/demonstration/start-transfer/{shortcode} \
  -H 'Accept: application/json'

```

```http
POST https://gesturelogger.com:8000/demonstration/start-transfer/{shortcode} HTTP/1.1
Host: gesturelogger.com:8000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('https://gesturelogger.com:8000/demonstration/start-transfer/{shortcode}',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.post 'https://gesturelogger.com:8000/demonstration/start-transfer/{shortcode}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.post('https://gesturelogger.com:8000/demonstration/start-transfer/{shortcode}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://gesturelogger.com:8000/demonstration/start-transfer/{shortcode}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://gesturelogger.com:8000/demonstration/start-transfer/{shortcode}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://gesturelogger.com:8000/demonstration/start-transfer/{shortcode}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /demonstration/start-transfer/{shortcode}`

Starts the transfer of demonstration data relevant to the specified shortcode

<h3 id="post__demonstration_start-transfer_{shortcode}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|shortcode|path|string|true|A code that is used to uniquely identify a gesture class|

> Example responses

> 201 Response

```json
{
  "project_name": "string",
  "gesture_id": "string"
}
```

<h3 id="post__demonstration_start-transfer_{shortcode}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Returns an object which uniquely describes the location of the gesture identified by the shortCode|[GestureClassLocator](#schemagestureclasslocator)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid or expired shortCode|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unknown Server Error|None|

<aside class="success">
This operation does not require authentication
</aside>

## post__demonstration_append-data_{shortcode}

> Code samples

```shell
# You can also use wget
curl -X POST https://gesturelogger.com:8000/demonstration/append-data/{shortcode} \
  -H 'Content-Type: multipart/form-data'

```

```http
POST https://gesturelogger.com:8000/demonstration/append-data/{shortcode} HTTP/1.1
Host: gesturelogger.com:8000
Content-Type: multipart/form-data

```

```javascript
const inputBody = '{
  "data": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('https://gesturelogger.com:8000/demonstration/append-data/{shortcode}',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'multipart/form-data'
}

result = RestClient.post 'https://gesturelogger.com:8000/demonstration/append-data/{shortcode}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('https://gesturelogger.com:8000/demonstration/append-data/{shortcode}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'multipart/form-data',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://gesturelogger.com:8000/demonstration/append-data/{shortcode}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://gesturelogger.com:8000/demonstration/append-data/{shortcode}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"multipart/form-data"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://gesturelogger.com:8000/demonstration/append-data/{shortcode}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /demonstration/append-data/{shortcode}`

Append demonstration gesture data to the relevant gesture class. You must first start the tranfer before this route will work

> Body parameter

```yaml
data: string

```

<h3 id="post__demonstration_append-data_{shortcode}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|shortcode|path|string|true|A code that is used to uniquely identify a gesture class|
|body|body|[data](#schemadata)|false|none|

<h3 id="post__demonstration_append-data_{shortcode}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Data received|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid or expired shortCode|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unknown Server Error|None|

<aside class="success">
This operation does not require authentication
</aside>

## get__demonstration_get-demonstration_{project_name}_{gesture_id}

> Code samples

```shell
# You can also use wget
curl -X GET https://gesturelogger.com:8000/demonstration/get-demonstration/{project_name}/{gesture_id} \
  -H 'Accept: text/csv'

```

```http
GET https://gesturelogger.com:8000/demonstration/get-demonstration/{project_name}/{gesture_id} HTTP/1.1
Host: gesturelogger.com:8000
Accept: text/csv

```

```javascript

const headers = {
  'Accept':'text/csv'
};

fetch('https://gesturelogger.com:8000/demonstration/get-demonstration/{project_name}/{gesture_id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'text/csv'
}

result = RestClient.get 'https://gesturelogger.com:8000/demonstration/get-demonstration/{project_name}/{gesture_id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'text/csv'
}

r = requests.get('https://gesturelogger.com:8000/demonstration/get-demonstration/{project_name}/{gesture_id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'text/csv',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://gesturelogger.com:8000/demonstration/get-demonstration/{project_name}/{gesture_id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://gesturelogger.com:8000/demonstration/get-demonstration/{project_name}/{gesture_id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"text/csv"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://gesturelogger.com:8000/demonstration/get-demonstration/{project_name}/{gesture_id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /demonstration/get-demonstration/{project_name}/{gesture_id}`

Fetches the specified demonstration gesture data

<h3 id="get__demonstration_get-demonstration_{project_name}_{gesture_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|project_name|path|string|true|The name of the relevant project|
|gesture_id|path|string|true|The id of the relevant gesture class|

> Example responses

> 200 Response

<h3 id="get__demonstration_get-demonstration_{project_name}_{gesture_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A stream of text with the gesture data of the specified demonstration|string|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|The request demonstration does not exist on the server|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unknown Server Error|None|

<aside class="success">
This operation does not require authentication
</aside>

## get__demonstration_demonstration-exists_{project_name}_{gesture_id}

> Code samples

```shell
# You can also use wget
curl -X GET https://gesturelogger.com:8000/demonstration/demonstration-exists/{project_name}/{gesture_id}

```

```http
GET https://gesturelogger.com:8000/demonstration/demonstration-exists/{project_name}/{gesture_id} HTTP/1.1
Host: gesturelogger.com:8000

```

```javascript

fetch('https://gesturelogger.com:8000/demonstration/demonstration-exists/{project_name}/{gesture_id}',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://gesturelogger.com:8000/demonstration/demonstration-exists/{project_name}/{gesture_id}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://gesturelogger.com:8000/demonstration/demonstration-exists/{project_name}/{gesture_id}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://gesturelogger.com:8000/demonstration/demonstration-exists/{project_name}/{gesture_id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://gesturelogger.com:8000/demonstration/demonstration-exists/{project_name}/{gesture_id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://gesturelogger.com:8000/demonstration/demonstration-exists/{project_name}/{gesture_id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /demonstration/demonstration-exists/{project_name}/{gesture_id}`

Checks if a demonstration has data that exists as a file on the server

<h3 id="get__demonstration_demonstration-exists_{project_name}_{gesture_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|project_name|path|string|true|The name of the relevant project|
|gesture_id|path|string|true|The id of the relevant gesture class|

<h3 id="get__demonstration_demonstration-exists_{project_name}_{gesture_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The specified demonstration exists on the server|None|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|The request demonstration does not exist on the server|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unknown Server Error|None|

<aside class="success">
This operation does not require authentication
</aside>

## get__demonstration_shortcode-exists_{shortcode}

> Code samples

```shell
# You can also use wget
curl -X GET https://gesturelogger.com:8000/demonstration/shortcode-exists/{shortcode} \
  -H 'Accept: application/json'

```

```http
GET https://gesturelogger.com:8000/demonstration/shortcode-exists/{shortcode} HTTP/1.1
Host: gesturelogger.com:8000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('https://gesturelogger.com:8000/demonstration/shortcode-exists/{shortcode}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://gesturelogger.com:8000/demonstration/shortcode-exists/{shortcode}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://gesturelogger.com:8000/demonstration/shortcode-exists/{shortcode}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://gesturelogger.com:8000/demonstration/shortcode-exists/{shortcode}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://gesturelogger.com:8000/demonstration/shortcode-exists/{shortcode}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://gesturelogger.com:8000/demonstration/shortcode-exists/{shortcode}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /demonstration/shortcode-exists/{shortcode}`

Checks if a shortCode is valid. Returns a gesture locator if it does.

<h3 id="get__demonstration_shortcode-exists_{shortcode}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|shortcode|path|string|true|A code that is used to uniquely identify a gesture class|

> Example responses

> 200 Response

```json
{
  "project_name": "string",
  "gesture_id": "string"
}
```

<h3 id="get__demonstration_shortcode-exists_{shortcode}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The specified shortcode exists. Returns a locator which identifies the gesture pointed to by the shortcode.|[GestureClassLocator](#schemagestureclasslocator)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid or expired shortCode|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unknown Server Error|None|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_data">data</h2>
<!-- backwards compatibility -->
<a id="schemadata"></a>
<a id="schema_data"></a>
<a id="tocSdata"></a>
<a id="tocsdata"></a>

```json
{
  "data": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|string(binary)|true|none|none|

<h2 id="tocS_GestureRequest">GestureRequest</h2>
<!-- backwards compatibility -->
<a id="schemagesturerequest"></a>
<a id="schema_GestureRequest"></a>
<a id="tocSgesturerequest"></a>
<a id="tocsgesturerequest"></a>

```json
{
  "project_name": "string",
  "participant_id": "string",
  "trial_id": "string",
  "gesture_index": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|project_name|string|true|none|none|
|participant_id|string|true|none|none|
|trial_id|string|true|none|none|
|gesture_index|number|true|none|none|

<h2 id="tocS_ProjectRequest">ProjectRequest</h2>
<!-- backwards compatibility -->
<a id="schemaprojectrequest"></a>
<a id="schema_ProjectRequest"></a>
<a id="tocSprojectrequest"></a>
<a id="tocsprojectrequest"></a>

```json
{
  "project_name": "string",
  "password": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|project_name|string|true|none|none|
|password|string|true|none|none|

<h2 id="tocS_GestureClassLocator">GestureClassLocator</h2>
<!-- backwards compatibility -->
<a id="schemagestureclasslocator"></a>
<a id="schema_GestureClassLocator"></a>
<a id="tocSgestureclasslocator"></a>
<a id="tocsgestureclasslocator"></a>

```json
{
  "project_name": "string",
  "gesture_id": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|project_name|string|true|none|none|
|gesture_id|string|true|none|none|

<h2 id="tocS_Gesture">Gesture</h2>
<!-- backwards compatibility -->
<a id="schemagesture"></a>
<a id="schema_Gesture"></a>
<a id="tocSgesture"></a>
<a id="tocsgesture"></a>

```json
{
  "gesture_id": "string",
  "gesture_name": "string",
  "instructions": "string",
  "duration": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|gesture_id|string|true|none|none|
|gesture_name|string|true|none|none|
|instructions|string|true|none|none|
|duration|number|true|none|none|

<h2 id="tocS_Trial">Trial</h2>
<!-- backwards compatibility -->
<a id="schematrial"></a>
<a id="schema_Trial"></a>
<a id="tocStrial"></a>
<a id="tocstrial"></a>

```json
{
  "trial_id": "string",
  "trial_name": "string",
  "instructions": "string",
  "gestures": [
    {
      "gesture_id": "string",
      "gesture_name": "string",
      "instructions": "string",
      "duration": 0
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|trial_id|string|true|none|none|
|trial_name|string|true|none|none|
|instructions|string|true|none|none|
|gestures|[[Gesture](#schemagesture)]|true|none|none|

<h2 id="tocS_Participant">Participant</h2>
<!-- backwards compatibility -->
<a id="schemaparticipant"></a>
<a id="schema_Participant"></a>
<a id="tocSparticipant"></a>
<a id="tocsparticipant"></a>

```json
{
  "participant_id": "string",
  "pendingTrials": [
    {
      "trial_id": "string",
      "trial_name": "string",
      "instructions": "string",
      "gestures": [
        {
          "gesture_id": "string",
          "gesture_name": "string",
          "instructions": "string",
          "duration": 0
        }
      ]
    }
  ],
  "completedTrials": [
    {
      "trial_id": "string",
      "trial_name": "string",
      "instructions": "string",
      "gestures": [
        {
          "gesture_id": "string",
          "gesture_name": "string",
          "instructions": "string",
          "duration": 0
        }
      ]
    }
  ],
  "urlCode": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|participant_id|string|true|none|none|
|pendingTrials|[[Trial](#schematrial)]|true|none|none|
|completedTrials|[[Trial](#schematrial)]|true|none|none|
|urlCode|string|false|none|none|

<h2 id="tocS_Project">Project</h2>
<!-- backwards compatibility -->
<a id="schemaproject"></a>
<a id="schema_Project"></a>
<a id="tocSproject"></a>
<a id="tocsproject"></a>

```json
{
  "project_name": "string",
  "description": "string",
  "encryptedPass": "string",
  "participants": [
    {
      "participant_id": "string",
      "pendingTrials": [
        {
          "trial_id": "string",
          "trial_name": "string",
          "instructions": "string",
          "gestures": [
            {
              "gesture_id": "string",
              "gesture_name": "string",
              "instructions": "string",
              "duration": 0
            }
          ]
        }
      ],
      "completedTrials": [
        {
          "trial_id": "string",
          "trial_name": "string",
          "instructions": "string",
          "gestures": [
            {
              "gesture_id": "string",
              "gesture_name": "string",
              "instructions": "string",
              "duration": 0
            }
          ]
        }
      ],
      "urlCode": "string"
    }
  ],
  "token": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|project_name|string|true|none|none|
|description|string|true|none|none|
|encryptedPass|string|true|none|none|
|participants|[[Participant](#schemaparticipant)]|true|none|none|
|token|string|true|none|none|

