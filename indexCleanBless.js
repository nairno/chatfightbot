const tmi = require('tmi.js');



const options = {
  options: {
    debug: true,
  },
  connection: {
    cluster:'aws',
    reconnect: true,
  },
  identity:{
    username: 'chatfightbot',
    password: 'oauth:t71dnr76gk2oz0b9dht099upbb2srk',
  },
  channels:['lounatuna','chatfightbot',''],

};


const client = new tmi.client(options);

client.connect();


var canQuizPop = false
var randomNumber = 0
var champion = ["noone"]
var typeChat = 0
var battleFire = true

//this needs to change based on the channel name
var thisChannel = 1



//client connects
client.on('connected', (address,port) => {
  client.action('lounatuna','hello, chatfightbot is now connected');
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
client.on('chat', (channel,user, message, self, badges) => {

  if (`${user['user-type']}`=='staff' && typeChat == 0){
    typeChat += 1;
    console.log(typeChat);
    typeChat -= 1;
    var championVal = champion[champion.length - 1];
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
    client.action('lounatuna','No quiz yet');
    console.log(func)
  }
  else if (canQuizPop == true){
    client.action('lounatuna','Lets quiz');
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
    console.log(`${user['id']}`)
    if ('lounatuna', `${user['display-name']}` != championVal){
  //if random number is above 50 then they win the battle
      if (randomNumber >= 50){
        client.say('lounatuna', `${user['display-name']} you are the new champion`);
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
          client.say('lounatuna', 'You may now challenge the champion in a fight to the death');
        };
        setTimeout(battleFuncWin, 4 * 10000);
  //number is below 50 then they lose the battle

  //put in switches for the losing fights

}if (randomNumber <= 49 && randomNumber >= 40){
        client.say('lounatuna', `${user['display-name']} you lost the battle...just`);
        console.log (randomNumber)
        battleFire = false
        const battleFuncLose = () => {
          console.log('lose timer finish');
          battleFire = true
          console.log(battleFire);
          client.say('lounatuna', 'You may now challenge the champion in a fight to the death');
          championVal = champion[champion.length - 1];
        };
        setTimeout(battleFuncLose, 4 * 10000);
      } if (randomNumber <= 39 && randomNumber >= 30){
      client.say('lounatuna', `${user['display-name']} you lost the battle...it was a tough fight`);
      console.log (randomNumber)
      battleFire = false
      const battleFuncLose = () => {
        console.log('lose timer finish');
        battleFire = true
        console.log(battleFire);
        client.say('lounatuna', 'You may now challenge the champion in a fight to the death');
        championVal = champion[champion.length - 1];
      };
      setTimeout(battleFuncLose, 4 * 10000);
    } if (randomNumber <= 29 && randomNumber >= 20){
    client.say('lounatuna', `${user['display-name']} you lost the battle...it may have looked close, but it wasn't`);
    console.log (randomNumber)
    battleFire = false
    const battleFuncLose = () => {
      console.log('lose timer finish');
      battleFire = true
      console.log(battleFire);
      client.say('lounatuna', 'You may now challenge the champion in a fight to the death');
      championVal = champion[champion.length - 1];
    };
    setTimeout(battleFuncLose, 4 * 10000);
    }if (randomNumber <= 19 && randomNumber >= 10){
      client.say('lounatuna', `${user['display-name']} you lost the battle...really badly`);
      console.log (randomNumber)
      battleFire = false
      const battleFuncLose = () => {
        console.log('lose timser finish');
        battleFire = true
        console.log(battleFire);
        client.say('lounatuna', 'You may now challenge the champion in a fight to the death');
        championVal = champion[champion.length - 1];
  };
  setTimeout(battleFuncLose, 4 * 10000);
  }if (randomNumber <= 9){
    client.say('lounatuna', `${user['display-name']} you lost the battle...you are the worst`);
    console.log (randomNumber)
    battleFire = false
    const battleFuncLose = () => {
      console.log('lose timser finish');
      battleFire = true
      console.log(battleFire);
      client.say('lounatuna', 'You may now challenge the champion in a fight to the death');
      championVal = champion[champion.length - 1];
};
setTimeout(battleFuncLose, 4 * 10000);
}

//if the current champion types then no need to do anything
}else if ('lounatuna', `${user['display-name']}` == championVal){
  championVal = champion[champion.length - 1];
  client.say('lounatuna',`${user['display-name']}` + ' you are the current champion');
  console.log('already champ')
  }


//if batt
}else if (battleFire == false) {
client.say('lounatuna', 'you must wait for the next battle');
  }
}


if (message == '!champion'){
  console.log(champion)
  championVal = champion[champion.length - 1];
  console.log(championVal)
  client.say('lounatuna', championVal + ' is the current champion');
}

//disconnect the bot
  if (message === '!disconnect' && `${user['display-name']}`== 'lounatuna'){
    client.disconnect();
}

});


function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}
