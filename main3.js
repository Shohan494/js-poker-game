var playerCards = [];
var boardCards = [];
var winnersHand = [];
var highCardSet = [];
var numberOfCards = 8;
var randomCard;
var deck = [];
var suits = ["Spades"];
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

var helpingHand = [];
helpingHand = winnersHand.concat(playerCards);

var sortedPlayerCards = helpingHand.sort(function(a,b)
{
  return values.indexOf(a.Value) - values.indexOf(b.Value);
});

sortedPlayerCards = sortedPlayerCards.reverse();
console.log("Sorted Player Cards: ", sortedPlayerCards);
console.log("\n");
console.log("Normal Player Cards: ", playerCards);

var highCardHolder = playerCards.indexOf(sortedPlayerCards[0]);
console.log("\n");
console.log("highCardHolder index no: ", highCardHolder);
console.log("\n");

var emptyArr = [];
var helpMe = []

function creatingHighCards()
{
  helpMe = emptyArr.concat(boardCards);
  highCardSet = helpMe.sort(function(a,b)
  {
    return values.indexOf(a.Value) - values.indexOf(b.Value);
  });
  highCardSet = highCardSet.reverse();
}

creatingHighCards();
console.log("After Sorting: ", highCardSet);

var score = [];


function getScore() 
{
	var tempScore = 0;
  for (i = 0; i < 5; i++ )
  {
  	//console.log("Score", values.indexOf(highCardSet[i].Value));
    tempScore = tempScore + values.indexOf(highCardSet[i].Value);
  }
  return score.push(tempScore);
}


var winnersHand;
var winnerHandValue;

function getWinner() 
{
	/*winnerHandValue = 
	playerCards.reduce((max, p) => p.Value > max ? p.Value : max, playerCards[0].Value);
  */
 
 winnerHandValue = sortedPlayerCards[0].Value;
 
  winnerHand = playerCards.findIndex(i => i.Value === winnerHandValue);
  return winnerHand;
}

function topFiveCards()
{
	for(var i = 0; i < 8; i++)
	{
		console.log("inside top five cards loop", i);
    highCardSet.push(playerCards[i]);
    highCardSet = highCardSet.sort(function(a,b)
    {
      return values.indexOf(a.Value) - values.indexOf(b.Value);
    });
    highCardSet = highCardSet.reverse();
    highCardSet.pop();
    getScore();
    console.log(score);

    if ( i % 2 != 0 && i > 0) 
    {
    	creatingHighCards();
    }
	}		
}

//console.log(values.indexOf(highCardSet[i].Value));
topFiveCards();


var max = score.reduce(function(a, b) {
    return Math.max(a, b);
});

console.log("\n");
console.log("Top Hand is Player: ", Math.floor(score.indexOf(max)/2) + 1);

console.log("\n");
console.log("highCardSet: ", highCardSet);

getWinner();
console.log(winnerHandValue);
console.log(winnerHand);

console.log("Winner with high card, " + winnerHandValue + ". Player: ", Math.floor(winnerHand/2) + 1);