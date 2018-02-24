console.log('node_usr bot is running...');

var tmi = require('tmi.js');
var auth = require('./twitchAuth.js');
var channel = '';

if (process.argv[2]) {
  console.log('Targeting Channel: '+process.argv[2]);
  targetChannel = process.argv[2];
}

var config = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
      username: auth.username,
      password: auth.password
    },
    channels: [targetChannel]
};
var client = new tmi.client(config);
client.connect();

client.on('chat', (channel, user, message, self) => {

  if (message === '!thisStreamer') {
    client.action(channel, (
      '@'+user['display-name']+' @'+targetChannel+' is a pretty cool dude!'
    ))
    .catch((err) => {
      console.log(err);
    });
  }
});

// don't use this it will get the bot timed out lul!
// setInterval(() => {
//   client.action(channel, (
//     '@'+targetChannel+' Hey Dude! HeyGuys I just wanted to say'+
//     ' that I love your channel'+
//     ', and I think you are a great source of positivity :)'
//   ))
//   .catch((err) => {
//     console.log(err);
//   });
// }, 1000*40);

client.on('subscription', (channel, username, method, message, userstate) => {
    client.action(channel, (
      '@'+username+' Thank you for subscribing to the finest '+
      'streamer on twitch'
    ))
    .catch((err) => {
      console.log(err);
    });
});

client.on('resub', (channel, username, method, message, userstate) => {
  client.action(channel, (
    '@'+username+' Thank you for re-subscribing to the finest '+
     'streamer on twitch'
  ))
  .catch((err) => {
    console.log(err);
  });
});

client.on('connected', (address, port) => {
  console.log('address: ', address, '\nport: ', port);
});
