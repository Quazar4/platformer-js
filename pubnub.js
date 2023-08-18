const pubnub = new PubNub({
    publishKey: "YOUR_PUBLISH_KEY",
    subscribeKey: "YOUR_SUBSCRIBE_KEY",
  });
  
  pubnub.subscribe({
    channels: ["game"],
  });
  
  pubnub.addListener({
    message: (message) => {
      // update the game state based on the message
      if (message.message.type === "move") {
        player2.x = message.message.x;
        player2.y = message.message.y;
      } else if (message.message.type === "attack") {
        player1.health -= 10;
      }
    },
  });
  
  document.addEventListener("keydown", (event) => {
    player1.move(event.keyCode);
  
    pubnub.publish({
      channel: "game",
      message: {
        type: "move",
        x: player1.x,
        y: player1.y,
      },
    });
  });
  
  document.addEventListener("keydown", (event) => {
    if (event.keyCode === 32) {
      player1.attack(player2);
  
      pubnub.publish({
        channel: "game",
        message: {
          type: "attack",
        },
      });
    }
  });
  
