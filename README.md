# sphero-node-playground
Messing around with Sphero programmed with Node.

Using [cylon.js](http://cylonjs.com/documentation/drivers/sphero/)

---

## Getting Started

1. Install [Node](https://npmjs.org) if you haven't.
1. Customize the `config` object.
    - Get `mySpheroPort` value by running `ls /dev/tty.Sphero*`.
1. Connect your Sphero via Bluetooth.
    - It will only connect for a few seconds, so when it says `Connected` hurry and run `node app.js`.

### Having problems?

_You might have to run the app more than once or double click Sphero in your Bluetooth options because the Sphero doesn't always connect (bluetooth issues). Before running the app, it should say `Connected` in your bluetooth settings.

---

## Other Options

This app uses `spheron` to control the Sphero; Spheron's API is not documented, so you have to read through the [Spheron source code](https://github.com/alchemycs/spheron/blob/master/lib/commands/api.js) to find other Sphero methods.