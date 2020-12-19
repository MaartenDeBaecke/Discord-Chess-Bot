const Discord = require('discord.js')
const client = new Discord.Client()
const Jimp = require('jimp');

let posDict = { //store the current position of every piece
  "A1": "rook-w",
  "A2": "pawn-w",
  "A3": "empty",
  "A4": "empty",
  "A5": "empty",
  "A6": "empty",
  "A7": "pawn-b",
  "A8": "rook-b",
  "B1": "knight-w",
  "B2": "pawn-w",
  "B3": "empty",
  "B4": "empty",
  "B5": "empty",
  "B6": "empty",
  "B7": "pawn-b",
  "B8": "knight-b",
  "C1": "bishop-w",
  "C2": "pawn-w",
  "C3": "empty",
  "C4": "empty",
  "C5": "empty",
  "C6": "empty",
  "C7": "pawn-b",
  "C8": "bishop-b",
  "D1": "queen-w",
  "D2": "pawn-w",
  "D3": "empty",
  "D4": "empty",
  "D5": "empty",
  "D6": "empty",
  "D7": "pawn-b",
  "D8": "queen-b",
  "E1": "king-w",
  "E2": "pawn-w",
  "E3": "empty",
  "E4": "empty",
  "E5": "empty",
  "E6": "empty",
  "E7": "pawn-b",
  "E8": "king-b",
  "F1": "bishop-w",
  "F2": "pawn-w",
  "F3": "empty",
  "F4": "empty",
  "F5": "empty",
  "F6": "empty",
  "F7": "pawn-b",
  "F8": "bishop-b",
  "G1": "knight-w",
  "G2": "pawn-w",
  "G3": "empty",
  "G4": "empty",
  "G5": "empty",
  "G6": "empty",
  "G7": "pawn-b",
  "G8": "knight-b",
  "H1": "rook-w",
  "H2": "pawn-w",
  "H3": "empty",
  "H4": "empty",
  "H5": "empty",
  "H6": "empty",
  "H7": "pawn-b",
  "H8": "rook-b"
};



let color = "white";
let finished = false;



//start new game
client.on('message', msg => {
  let generalChannel = client.channels.cache.get("788431824199221268");//declare channel the bot is active on
  let content = msg.content;

  if (msg.content === "!newgame"){
    //construct the board in starting position
    Jimp.read('./images/board.png', (err, startboard) => {
    if (err) throw err;
    startboard
      .resize(1193, 1190) // resize
      .write('./newImages/board.png'); // save
      generalChannel.send("White, you start!",{ //send the board to the players
          files: [
              "./newImages/board.png"
          ]
      });
    });

    //reset dictionary
    posDict = { //store the current position of every piece
      "A1": "rook-w",
      "A2": "pawn-w",
      "A3": "empty",
      "A4": "empty",
      "A5": "empty",
      "A6": "empty",
      "A7": "pawn-b",
      "A8": "rook-b",
      "B1": "knight-w",
      "B2": "pawn-w",
      "B3": "empty",
      "B4": "empty",
      "B5": "empty",
      "B6": "empty",
      "B7": "pawn-b",
      "B8": "knight-b",
      "C1": "bishop-w",
      "C2": "pawn-w",
      "C3": "empty",
      "C4": "empty",
      "C5": "empty",
      "C6": "empty",
      "C7": "pawn-b",
      "C8": "bishop-b",
      "D1": "queen-w",
      "D2": "pawn-w",
      "D3": "empty",
      "D4": "empty",
      "D5": "empty",
      "D6": "empty",
      "D7": "pawn-b",
      "D8": "queen-b",
      "E1": "king-w",
      "E2": "pawn-w",
      "E3": "empty",
      "E4": "empty",
      "E5": "empty",
      "E6": "empty",
      "E7": "pawn-b",
      "E8": "king-b",
      "F1": "bishop-w",
      "F2": "pawn-w",
      "F3": "empty",
      "F4": "empty",
      "F5": "empty",
      "F6": "empty",
      "F7": "pawn-b",
      "F8": "bishop-b",
      "G1": "knight-w",
      "G2": "pawn-w",
      "G3": "empty",
      "G4": "empty",
      "G5": "empty",
      "G6": "empty",
      "G7": "pawn-b",
      "G8": "knight-b",
      "H1": "rook-w",
      "H2": "pawn-w",
      "H3": "empty",
      "H4": "empty",
      "H5": "empty",
      "H6": "empty",
      "H7": "pawn-b",
      "H8": "rook-b"
    };


  } else if (content.substring(0, 4) === "move"){
    let currentPos = content.substring(5,7); //get the first position that is given
    let newPos = content.substring(11,13); // get the second position that is given

    if(posDict[newPos] === "king-b"){
      generalChannel.send("Game Over", {
        files: [
          "./images/win-w.png"
        ]
      });
    } else if (posDict[newPos] === "king-w"){
      generalChannel.send("Game Over", {
        files: [
          "./images/win-b.png"
        ]
      });
    } else {
      //replace the piece with an empty field
      getSquareColor(currentPos);
      let x = 66.5 + (currentPos.charCodeAt(0) - 65) * 140.1; //every square has a width of 140.1, the bezel at the left is 66.5
      let y = 63 + (8 - currentPos.charAt(1)) * 140.09; // every swuare has a height of 140.09, the bezel at the top is 63
      swap("./images/" + color + ".png", x, y);

      //indentify moving piece
      let movingPiece = posDict[currentPos];


      //draw the piece on his new field and update dictionary
      getSquareColor(currentPos);
      setTimeout(function(){
        let xx = 66.5 + (newPos.charCodeAt(0) - 65) * 140.1; //every square has a width of 140.1, the bezel at the left is 66.5
        let yy = 63 + (8 - newPos.charAt(1)) * 140.09; // every square has a height of 140.09, the bezel at the top is 63
        if (posDict[newPos] !== "empty"){
          getSquareColor(newPos);
          swap("./images/" + color + ".png", xx, yy);
          setTimeout(function(){
            swap("./images/" + movingPiece + ".png", xx, yy);
          }, 500)
        } else {
          swap("./images/" + movingPiece + ".png", xx, yy);
        }
        //update dictionary
        posDict[newPos] = movingPiece;
        posDict[currentPos] = "empty";
      }, 500);




      //send the new board
      setTimeout(function(){
        generalChannel.send("new turn", {
          files: [
            "./newImages/board.png"
          ]
        });
      }, 1500);
    }
  }
});


function getSquareColor(value){
  let firstValue = value.charCodeAt(0) - 64; //convert first letter to a number -> a = 1, b = 2, etc...
  let secondVallue = value.charAt(1);
  if (firstValue % 2 === 0){ //letters B, D, F, H
    if (secondVallue % 2 === 0){
      color = "blue";
    } else {
      color = "white";
    }
  } else {
    if (secondVallue % 2 === 0){ //letters A, C, E, G
      color = "white";
    } else {
      color = "blue";
    }
  }
}


//add image above other image
async function swap(img, x, y) {
  let  newPiece = await Jimp.read(img);
  newPiece = newPiece.resize(140,141);
  const imgBack = await Jimp.read('./newImages/board.png'); //image at the botom (the bord)
 newPiece = await newPiece
  imgBack.composite(newPiece, x, y, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacityDest: 1,
    opacitySource: 1
  })
  //await image.writeAsync(`newImages/${Date.now()}_waterMark_150x150.png`);
  await imgBack.writeAsync(`newImages/board.png`);
}






client.on('message', message => {
  // List servers the bot is connected to
  // console.log("Servers:")
  // client.guilds.cache.forEach((guild) => {
  //     console.log(" - " + guild.name)
  //
  //     guild.channels.cache.forEach((channel) => {
  //       console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`);
  //     })
  // })
});



const token = "Nzg4NDMyMjg3NDA1OTY1MzM0.X9jayQ.1S4AZjc47DX6m3A0WhiavjJEgmI"

client.login(token)
