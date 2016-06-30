import mqtt from 'mqtt'
import {spawn} from 'child_process'

const {AIO_USERNAME, AIO_KEY, AIO_FEED} = process.env

let exitStatus = 0

if (!AIO_USERNAME) {
  console.error('Error: Must supply AIO_USERNAME in environment')
  exitStatus += 1
}
if (!AIO_KEY) {
  console.error('Error: Must supply AIO_KEY in environment')
  exitStatus += 2
}
if (!AIO_FEED) {
  console.error('Error: Must supply AIO_FEED in environment')
  exitStatus += 4
}
if (exitStatus) {
  process.exit(exitStatus)
}

const client = mqtt.connect('mqtt://io.adafruit.com:1883', {
  username: AIO_USERNAME,
  password: AIO_KEY,
})

client.on('connect', () => {
  console.log('connected, listening for changes...')
  client.subscribe(`${AIO_USERNAME}/feeds/${AIO_FEED}`)
})

let previousPayload = null
client.on('message', (topic, message) => {
  // message is Buffer
  const payload = message.toString()
  // sometimes AIO MQTT sends duplicate messages
  if (payload !== previousPayload) {
    console.log(`got message '${payload}', toggling power...`)
    spawn('irsend', ['SEND_ONCE', 'AirConditioner', 'POWER'])
    previousPayload = payload
  }
})

process.on('SIGINT', () => {
  console.log('got SIGINT, exiting...')
  client.end()
})
