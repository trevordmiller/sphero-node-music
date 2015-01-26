// IMPORTS
var Cylon = require('cylon');
var chalk = require('chalk');
var say = require('say');
var sys = require('sys')
var exec = require('child_process').exec;
var meta = require('./package.json');

// INTERNALS

// User options
var config = {
    port: '/dev/tty.Sphero-WWB-AMP-SPP',
    spotifyUri: 'spotify:artist:0C0XlULifJtAgn6ZNCW2eu',
    randomRoll: false
};

// Shared functions
function puts(error, stdout, stderr) {
    sys.puts(stdout)
}

// Cylon.js
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
            console.log(chalk.bgCyan('----------------------------------------------------'));
            console.log(chalk.bgCyan('Running ' + meta.name + ' version ' + meta.version));
            console.log(chalk.bgCyan('----------------------------------------------------'));
            console.log(chalk.bgCyan('It\'s party time.'));
            say.speak('Alex', 'Hello world. I\'m Spheero. I like to party.');
            console.log(chalk.cyan('Setting up Collision Detection...'));
            me.sphero.detectCollisions();
            me.sphero.stop();

            // Start playing from Spotify URI
            exec('spotify play ' + config.spotifyUri, puts);
            console.log(chalk.bold.magenta('Playing chosen Spotify URI'));
            songsPlayed = songsPlayed + 1;
            color = 0x800080;
            me.sphero.setRGB(color);
        });

        // On disconnect
        me.sphero.on('disconnect', function() {
            exec('spotify pause', puts);
            console.log(chalk.bgCyan('Goodbye world!'));
            say.speak('Alex', 'Goodbye world!');
        });

        // When a tap or collision happens
        me.sphero.on('collision', function() {
            songsPlayed = songsPlayed + 1;

            // Skip to next song
            exec('spotify next', puts);
            if ((songsPlayed % 2) === 0) {
                console.log(chalk.bold.blue('Playing song ' + songsPlayed));
                color= 0x0000FF;
                me.sphero.setRGB(color);
            } else {
                console.log(chalk.bold.magenta('Playing song ' + songsPlayed));
                color = 0x800080;
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
