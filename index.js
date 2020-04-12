const tmi = require('tmi.js');

const options = {
  options: {
    debug: true,
  },
  connection: {
    cluster:'aws',
    reconnect: true,
  },
  /*
  identity:{
    username: 'nairnobot',
    password: 'oauth:t71dnr76gk2oz0b9dht099upbb2srk',
    */
    //testing
class TwitchChatListener extends EventEmitter {
  constructor(config, services) {
    super();
    this.channel = config.channelId;
    const token = config.accessToken;
    const { clientId } = config;

    this.logger = services.logger;

    this.options = {
      options: {
        clientId,
      },
      connection: {
        reconnect: true,
      },
      identity: {
        username: this.channel,
        password: `oauth:${token}`,
      },
      channels: [this.channel],
    };
  }

  },
  channels:['nairno','chatfightbot',''],

};

const client = new tmi.client(options);

client.connect();


//variables




var canQuizPop = false
var randomNumber = 0
var champion = ["champions"]
var typeChat = 0
var battleFire = true
var


/* for when we're relooking at the json as an option
var fs = require('fs');
var data = fs.readFileSync('words.json')
var indexData = JSON.parse(data);
*/


//console.log(data)

//client connects
client.on('connected', (address,port) => {
  client.action('chatfightbot','hello, chatfightbot is now connected');
  console.log()
  console.log(typeChat)


  const func = () => {
    console.log('Hello after 4 seconds');
    canQuizPop = true
    console.log(canQuizPop);
  };
    setTimeout(func, 4 * 10000);
});

//user chats
client.on('chat', (channel,user, message, self) => {
  //console.log(user)
  if (`${user['user-type']}`=='staff' && typeChat == 0){
    typeChat += 1;
    console.log(typeChat);
    typeChat -= 1;
    var championVal = champion[champion.length - 1];
    //client.say('nairno', `${user['user-type']}`);
  }
  if (message === '!game'){
    client.action('chatfightbot','chatfightbot is playing a game');
    if (self) return;
    console.log(user)
  }

//try to fire the quiz
  if (message === '!quiz'){
  //create a random number for it to fire
  randomNumber = Math.floor((Math.random() * 100) + 1);
  console.log(randomNumber)
  if (canQuizPop == false){
    client.action('chatfightbot','No quiz yet');
    console.log(func)
  }
  else if (canQuizPop == true){
    client.action('chatfightbot','Lets quiz');
  }
  //set if the quiz can canQuizPop
  if (canQuizPop == true){
    console.log('quiz can pop');
    canQuizPop = false
  }


}

//make someone the Leader

if (message == '!battle'){
  championVal = champion[champion.length - 1];
  console.log(championVal)
  if(battleFire == true){
    randomNumber = Math.floor((Math.random() * 100) + 1);
    console.log(randomNumber)
    if ('chatfightbot', `${user['display-name']}` != championVal){
  //if random number is above 50 then they win the battle
      if (randomNumber >= 50){
        client.say('chatfightbot', `${user['display-name']} you are the new champion`);
        console.log (randomNumber)
        champion.push(`${user['display-name']}`);
        championVal = champion[champion.length - 1];
        console.log(champion);
        console.log(championVal);
        battleFire = false

        const battleFuncWin = () => {
          console.log('win timer finish');
          battleFire = true
          console.log(battleFire);
          client.say('chatfightbot', 'You may now challenge the champion in a fight to the death');
        };
        setTimeout(battleFuncWin, 4 * 10000);
  //number is below 50 then they win the battle
      }else if(randomNumber <= 50){
        client.say('chatfightbot', `${user['display-name']} you lost the battle`);
        console.log (randomNumber)
        battleFire = false
        const battleFuncLose = () => {
          console.log('lose timer finish');
          battleFire = true
          console.log(battleFire);
          client.say('chatfightbot', 'You may now challenge the champion in a fight to the death');
          championVal = champion[champion.length - 1];
        };
        setTimeout(battleFuncLose, 4 * 10000);


}

//if the current champion types then no need to do anything
  }else if ('chatfightbot', `${user['display-name']}` == championVal){
  championVal = champion[champion.length - 1];
  client.say('chatfightbot',`${user['display-name']}` + ' you are the current champion');
  console.log('already champ')
  }


//if batt
}else if (battleFire == false) {
client.say('chatfightbot', 'you must wait for the next battle');
  }
}


if (message == '!champion'){
  console.log(champion)
  championVal = champion[champion.length - 1];
  console.log(championVal)
  client.say('chatfightbot', championVal + ' is the current champion');
}

/*
if (message == '!history'){
  console.log(champion)
  client.say('nairno', champion);
}
*/
//disconnect the bot
  if (message === '!disconnect'){
    client.disconnect();
}

});


//client.action('nairno', `hey ${user['display-name']}!`);
/*
if (message === '!dice'){
  const num = rollDice();
  client.say('nairno', `${user['display-name']} You rolled a ${num}`);
  client.say('nairno', `${user['user-type']}`);
}
*/

function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}
