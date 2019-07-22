# oauth2


An easy way to get started with a Express server with Node.js.

## Make Requests

Create and refresh access tokens:

```sh
http POST http://localhost:3000/oauth/token grant_type=password client_id=android client_secret=SomeRandomCharsAndNumbers username=myapi password=abc1234
http POST http://localhost:3000/oauth/token grant_type=refresh_token client_id=android client_secret=SomeRandomCharsAndNumbers refresh_token=[REFRESH_TOKEN]
```

## Requirements


## Installation

* `git clone 
* `cd 
* `npm install`
* `npm start`