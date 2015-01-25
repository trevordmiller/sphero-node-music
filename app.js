// IMPORTS
var Cylon = require('cylon');
var chalk = require('chalk');
var say = require('say');
var meta = require('./package.json');

// INTERNALS

var config = {
    port: '/dev/tty.Sphero-WWB-AMP-SPP'
};

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
            collisionCount = 0,
            maxCollisions = 5,
            bitFilter = 0xFFFF00;

        after((1).seconds(), function() {
            me.sphero.setRGB(color);
            say.speak('Alex', 'Hello world! I like to party.', function(){
                console.log(chalk.bold.blue('Hello world! I like to party.'));
                console.log(chalk.bold.blue('Setting up Collision Detection...'));
                me.sphero.detectCollisions();
                me.sphero.stop();
                me.sphero.roll(200, Math.floor(Math.random() * 360));
            });

        });

        me.sphero.on('collision', function() {
            collisionCount = collisionCount + 1;
            console.log(chalk.bold.red('Collision Count: ' + collisionCount));
            if(collisionCount >= maxCollisions) {
                color = color ^ bitFilter;
                me.sphero.setRGB(color);
                me.sphero.stop();
            }
            else {
                say.speak('Alex', 'Ouch!');
                console.log(chalk.bold.magenta('Ouch!'));
                color = color ^ bitFilter;
                me.sphero.setRGB(color);
                me.sphero.roll(200, Math.floor(Math.random() * 360));
            }
        });
    }
}).start();

//var color = 0xFFFFFF,
//    collisionCount = 0,
//    maxCollisions = 5;
//
//after((1).seconds(), function() {
//    me.sphero.setRGB(color);
//    console.log(chalk.bold.blue('Hello world! I like to party.'));
//    say.speak('Alex', 'Hello world! I like to party.', function(){
//        console.log(chalk.bold.blue('Setting up Collision Detection...'));
//        me.sphero.detectCollisions();
//        me.sphero.stop();
//        me.sphero.roll(150, Math.floor(Math.random() * 360));
//    });
//});
//
//me.sphero.on('collision', function() {
//    collisionCount = collisionCount + 1;
//    if(collisionCount >= maxCollisions) {
//        me.sphero.stop();
//        console.log(chalk.bold.blue('I do not like to party any more.'));
//        say.speak('Alex', 'I do not like to party any more. I need to go to the hospital.', function(){
//            color = 0x000000;
//            me.sphero.setRGB(color);
//        });
//    } else {
//        say.speak('Alex', 'Ouch!');
//        console.log(chalk.bold.magenta('Ouch!'));
//        color = 0x00FF00;
//        me.sphero.setRGB(color);
//        me.sphero.roll(150, Math.floor(Math.random() * 360));
//    }
//});