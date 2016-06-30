# ac-remote
MQTT + raspberry pi + lirc = air conditioner remote

Currently uses [Adafruit.IO](https://io.adafruit.com/) as a MQTT broker.

## setup
Requires Node.js 6 (or newer) and `npm`.

Install dependencies: `npm i`

Run the client: `AIO_USERNAME=XXX AIO_KEY=XXX AIO_FEED=XXX npm start`

- `AIO_USERNAME`: your Adafruit.IO username
- `AIO_KEY`: your Adafruit.IO secret key
- `AIO_FEED`: the name of the feed

(see https://learn.adafruit.com/adafruit-io/mqtt-api)

When a message is recieved, the client will attempt to dedupe it, and run `lirc SEND_ONCE AirConditioner POWER`. (This of course assumes that you have `lirc` set up and configured.)

## TODO
- [ ] Make `lirc` command configurable
- [ ] Allow public feeds
- [ ] Web console
