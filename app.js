// IMPORTS
var Cylon = require('cylon');
var chalk = require('chalk');
var say = require('say');
var sys = require('sys')
var exec = require('child_process').exec;
var meta = require('./package.json');

// INTERNALS

// Config
var config = {
    port: '/dev/tty.Sphero-WWB-AMP-SPP',
    spotifyUri: 'spotify:artist:5oOhM2DFWab8XhSdQiITry',
    randomRoll: false
};

// Shared functions
function puts(error, stdout, stderr) {
    sys.puts(stdout)
}

// Init
console.log(chalk.bold.magenta('----------------------------------------------------'));
console.log(chalk.bold.magenta('Running ' + meta.name + ' version ' + meta.version));
console.log(chalk.bold.magenta('----------------------------------------------------'));

Cylon.robot({

    // Setup
    connections: {
        sphero: {
            adaptor: 'sphero',
            port: config.port
        }
    },
    devices: {
        sphero: {
            driver: 'sphero'
        }
    },

    // Main
    work: function(me) {
        var color = 0x800080,
            songsPlayed = 0;

        // Init
        after((1).seconds(), function() {
            say.speak('Alex', 'It\'s party time.');
            console.log('Setting up Collision Detection...');
            me.sphero.detectCollisions();
            me.sphero.stop();

            // Start playing from Spotify URI
            exec('spotify play ' + config.spotifyUri, puts);
            console.log(chalk.bold.magenta('Playing chosen Spotify URI'));
            color = 0x800080;
            me.sphero.setRGB(color);
        });

        // When a tap or collision happens
        me.sphero.on('collision', function() {
            songsPlayed = songsPlayed + 1;

            // Skip to next song
            exec('spotify next', puts);
            if ((songsPlayed % 2) === 0) {
                console.log(chalk.bold.magenta('Playing song ' + songsPlayed));
                color = 0x800080;
                me.sphero.setRGB(color);
            } else {
                console.log(chalk.bold.blue('Playing song ' + songsPlayed));
                color= 0x0000FF;
                me.sphero.setRGB(color);
            }
        });

        // Randomly change direction every second
        if(config.randomRoll === true) {
            every((10).second(), function() {
                me.sphero.roll(150, Math.floor(Math.random() * 360));
            });
        }
    }
}).start();
