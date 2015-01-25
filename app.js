// IMPORTS
var Cylon = require('cylon');
var chalk = require('chalk');
var say = require('say');
var meta = require('./package.json');

// INTERNALS

var config = {
    port: '/dev/tty.Sphero-WWB-AMP-SPP'
};
var songs = [
    'all-this-test.mp3',
    'you-and-me.mp3'
]

// Init
console.log(chalk.bold.magenta('----------------------------------------------------'));
console.log(chalk.bold.magenta('Running ' + meta.name + ' version ' + meta.version));
console.log(chalk.bold.magenta('----------------------------------------------------'));

Cylon.robot({
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

    work: function(me) {
        var color = 0x00FF00,
            bitFilter = 0xFFFF00;

        // Init
        after((1).seconds(), function() {
            say.speak('Alex', 'It\'s party time.')
            console.log('Setting up Collision Detection...');
            me.sphero.detectCollisions();
            me.sphero.setRGB(color);
            me.sphero.stop();
        });

        // When a collision happens
        me.sphero.on('collision', function() {
            var newSong = songs[Math.floor(Math.random() * songs.length)];
            console.log('Shuffle -> ' + newSong);
            color = color ^ bitFilter;
            me.sphero.setRGB(color);
        });

        // Randomly change direction every second
        every((5).second(), function() {
            me.sphero.roll(200, Math.floor(Math.random() * 360));
        });
    }
}).start();
