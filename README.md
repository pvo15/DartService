# The purpose of the project.
We have a dart game right in the office and we are gonna create a leader board for that game.
What we have are a dart board and an application can communicate intelligently to the dart board. this application is very capable. it can call APIs.

An easy way to get started with a Express server with Node.js.

## Make Requests

Create and refresh access tokens:

```sh
http POST http://localhost:3000/oauth/token grant_type=password client_id=android client_secret=SomeRandomCharsAndNumbers username=myapi password=abc1234
http POST http://localhost:3000/oauth/token grant_type=refresh_token client_id=android client_secret=SomeRandomCharsAndNumbers refresh_token=[REFRESH_TOKEN]
http POST http://localhost:3000/user email=test@test.com name=Smit password=password
http GET http://localhost:3000/user Header - Authorization : bearer TOKEN
```

## Installation

* `git clone https://github.com/pvo15/DartService.git
* `npm install`
* `npm start`