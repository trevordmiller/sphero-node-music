# Sphero Music

Control Spotify with your Sphero: play a new song from a Spotify URI when Sphero is tapped or collides with something in "randomRoll" mode. Sphero changes colors to match logged output with each song change.

---

## Getting Started

1. Install [Node / npm](https://npmjs.org).
1. `npm install -g spotify-cli`.
1. `npm install`.
1. Open Spotify - _Spotify must be open in the background for this app to work_.
1. Turn on your Speakers.
1. Customize `config.js`.
1. Connect your Sphero via Bluetooth.
1. Double tap your Sphero to wake it up - _it should be flashing colors_.
1. `node app.js`.

---

### Having problems?

1. This has only been tested on Macs. Feel free to submit a pull request if/where changes are needed for other platforms.
1. You might have to run the app more than once or double click Sphero in your Bluetooth options because the Sphero doesn't always connect (bluetooth issues). It also doesn't always set up collision detection correctly the first time.

---

Using [cylon.js](http://cylonjs.com/documentation/drivers/sphero/). Check out the Cylon.js API and examples for more info.