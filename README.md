# Sphero Music

Control Spotify with your Sphero. Play a new song from a Spotify URI when Sphero is tapped or collides with something in "randomRoll" mode.

Using [cylon.js](http://cylonjs.com/documentation/drivers/sphero/)

---

## Getting Started

1. **Install** [Node / npm](https://npmjs.org) (if you haven't already).
1. **Run** `npm install -g spotify-cli` (to install the Spotify CLI globally on your machine).
1. **Open** Spotify (Spotify must be open in the background for this app to work).
1. **Turn on** your Speakers (to hear Sphero's voice and the music).
1. **Customize** the `config` object in `app.js`.
    - Get your Sphero's `mySpheroPort` value by running `ls /dev/tty.Sphero*`.
    - Get a `spotifyUri` by right clicking on a Spotify artist, album, or playlist and selecting `Copy Spotify URI`.
1. **Connect** your Sphero via Bluetooth (in System preferences).
1. **Double tap** your Sphero (to wake it up - it should be flashing colors).
1. **Run** `node app.js` (to start the app).

### Having problems?

1. This has only been tested on Macs. Feel free to submit a pull request if/where changes are needed for other platforms.
1. You might have to run the app more than once or double click Sphero in your Bluetooth options because the Sphero doesn't always connect (bluetooth issues). It also doesn't always set up collision detection correctly the first time.

---

## Other Options

This app uses `spheron` to control the Sphero; Spheron's API is not documented, so you have to read through the [Spheron source code](https://github.com/alchemycs/spheron/blob/master/lib/commands/api.js) to find other Sphero methods.