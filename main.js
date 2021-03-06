var playerCards = [];
var boardCards = [];
var winnersHand = [];
var numberOfCards = 10;
var randomCard;
var deck = [];
var suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K","A"];


function getDeck()
{
	//var deck = new Array();
	for(var i = 0; i < suits.length; i++)
	{
		for(var x = 0; x < values.length; x++)
		{
			var card = {Suit: suits[i], Value: values[x]};
			deck.push(card);
		}
	}
	return deck;
}

getDeck();

//console.log(deck[2].Suit);
//console.log(deck[2].Value);

console.log("Distributing Cards Among Players, Deck: ", deck.length);
console.log("\n");

for(var i = 0; i < numberOfCards; i++)
{
  randomCard = deck[Math.floor(Math.random()*deck.length)];
  playerCards.push(randomCard);
  var indexNumber = deck.indexOf(randomCard);
  deck.splice(indexNumber,1);
}

console.log("Player Cards Distributed, Deck: ", deck.length);
console.log("\n");

for(var i = 0; i < 5; i++)
{
  randomCard = deck[Math.floor(Math.random()*deck.length)];
  boardCards.push(randomCard);
  console.log(boardCards[i].Suit + " " + boardCards[i].Value);
  var indexNumber = deck.indexOf(randomCard);
  deck.splice(indexNumber,1);
}

console.log("\n");
console.log("Board Cards Distributed, Deck: ", deck.length);
console.log("\n");

var x = 0;
for(var i = 0; i < (numberOfCards/2); i++)
{
  console.log("Player " + (i+1) + "'s Hand: " + playerCards[x].Suit + " " + playerCards[x].Value + ", " + playerCards[x+1].Suit + " " + playerCards[x+1].Value);
  x = x + 2;
}

console.log("\n");
//console.log(playerCards);
