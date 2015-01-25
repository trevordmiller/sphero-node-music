# Sphero Music
Play a new song from a Spotify URI when Sphero is tapped or collides with something in "randomRoll" mode.

Using [cylon.js](http://cylonjs.com/documentation/drivers/sphero/)

---

## Getting Started

1. Install [Node](https://npmjs.org) if you haven't.
1. Run `npm install -g spotify-cli` to get the Spotify CLI.
1. Customize the `config` object.
    - Get `mySpheroPort` value by running `ls /dev/tty.Sphero*`.
    - Get `spotifyUri` by right clicking on a Spotify artist, album, or playlist and selecting `Copy Spotify URI`.
1. Open Spotify - it must be open for this app to work.
1. Connect your Sphero via Bluetooth.
1. Run `node app.js` to start the app.

### Having problems?

_You might have to run the app more than once or double click Sphero in your Bluetooth options because the Sphero doesn't always connect (bluetooth issues). Before running the app, it should say `Connected` in your bluetooth settings.

---

## Other Options

This app uses `spheron` to control the Sphero; Spheron's API is not documented, so you have to read through the [Spheron source code](https://github.com/alchemycs/spheron/blob/master/lib/commands/api.js) to find other Sphero methods.