var playerCards = [];
var boardCards = [];
var winnersHand = [];
var highCardSet = [];

var randomPlayersTable = [4,6,8,10,12,14,16,18]
var playerCardsNumber = randomPlayersTable[Math.floor(Math.random()*randomPlayersTable.length)];
var deck = [];
var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

function getDeck()
{
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

for(var i = 0; i < playerCardsNumber; i++)
{
  randomCard = deck[Math.floor(Math.random()*deck.length)];
  playerCards.push(randomCard);
  var indexNumber = deck.indexOf(randomCard);
  deck.splice(indexNumber,1);
}

console.log("Player Cards Distributed, Now Deck: ", deck.length);
console.log("\n");
var x = 0;
for(var i = 0; i < (playerCardsNumber/2); i++)
{
  console.log("Player " + (i+1) + "'s Hand: " + playerCards[x].Suit + " " + playerCards[x].Value + ", " + playerCards[x+1].Suit + " " + playerCards[x+1].Value);
  x = x + 2;
}

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
//console.log("\n");

var helpingHand = [];
helpingHand = winnersHand.concat(playerCards);

var sortedPlayerCards = helpingHand.sort(function(a,b)
{
  return values.indexOf(a.Value) - values.indexOf(b.Value);
});

sortedPlayerCards = sortedPlayerCards.reverse();
//console.log("Sorted Player Cards: ", sortedPlayerCards);
//console.log("\n");
//console.log("Normal Player Cards: ", playerCards);

var highCardHolder = playerCards.indexOf(sortedPlayerCards[0]);
console.log("\n");
//console.log("highCardHolder index no: ", highCardHolder);
//console.log("\n");

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

var score = [];
function getScore() 
{
	var tempScore = 0;
  for (i = 0; i < 5; i++ )
  {
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
	for(var i = 0; i < playerCardsNumber; i++)
	{
		//console.log("inside top five cards loop", i);
    highCardSet.push(playerCards[i]);
    highCardSet = highCardSet.sort(function(a,b)
    {
      return values.indexOf(a.Value) - values.indexOf(b.Value);
    });
    highCardSet = highCardSet.reverse();
    highCardSet.pop();
    getScore();
    //console.log(score);

    if ( i % 2 !== 0 && i > 0) 
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

var pair = [];

function getPair()
{
	for(var i = 0; i < playerCards.length; i++)
	{
		for(var x = 0; x < boardCards.length; x++)
		{
			if(playerCards[i].Value == boardCards[x].Value)
			{
			  console.log("Pair found of: " + boardCards[x].Value + " By Player: " + Math.floor((i/2) + 1));
			  var pairAndPlayer = { Pair: boardCards[x].Value, Player: Math.floor((i/2) + 1) };
			  pair.push(pairAndPlayer);
			}
		}
	}
}

var uniqueArrayofPlayer = true;
var uniqueArrayofcard = true;

function uniqueArrayofPlayerOrNot()
{
  //console.log("inside uniqueArrayofPlayerOrNot");
  for (var i = 0; i < pair.length - 1; i++) {
    if (pair[i + 1].Player == pair[i].Player) {
        uniqueArrayofPlayer = false;
        break;
    }
  }
  return uniqueArrayofPlayer;
}

var sortedPair = [];

function uniqueArrayofcardOrNot()
{
  //console.log("inside uniqueArrayofcardOrNot");
  sortedPair = pair.sort(function(a, b) {
    return values.indexOf(a.Pair) - values.indexOf(b.Pair);
  });
  
  for (var i = 0; i < sortedPair.length - 1; i++) {
    if (sortedPair[i + 1].Pair == sortedPair[i].Pair) {
        uniqueArrayofcard = false;
        break;
    }
  }
  return uniqueArrayofcard;
}

getPair();
console.log("\n");

var topPairPlayer;

if(pair.length === 0){
  console.log("No Pair Found, Winner will Be Decided By High Cards");
} else if (pair.length == 1) {
  console.log("Only one Player got a Pair");
  console.log("Player: " + pair[0].Player + " Wins");
} else {
  //console.log("inside else");
  
  uniqueArrayofPlayerOrNot();
  uniqueArrayofcardOrNot();
  
  console.log("uniqueArrayofPlayer", uniqueArrayofPlayer);
  console.log("uniqueArrayofcard", uniqueArrayofcard);
  console.log("\n");
  
  if(uniqueArrayofPlayer && uniqueArrayofcard)
  {
    //console.log("Inside uniqueArray if === 0");
    sortedPair = pair.sort(function(a, b) {
    return values.indexOf(a.Pair) - values.indexOf(b.Pair);
    });
    sortedPair.reverse();
    topPairPlayerAndCard = sortedPair[0];
    console.log("Winner with a high pair: ", topPairPlayerAndCard);
  } else if (uniqueArrayofPlayer && !uniqueArrayofcard)
  {
    //console.log("Inside uniqueArray if === 0");
    sortedPair = pair.sort(function(a, b) {
    return values.indexOf(a.Pair) - values.indexOf(b.Pair);
    });
    sortedPair.reverse();
    topPairPlayerAndCard = sortedPair[0];
    var moreThanOneWinnerWithPair = [];
    for (i = 0; i < sortedPair.length; i++)
    {
      if(topPairPlayerAndCard.Pair == sortedPair[i].Pair)
        {
          moreThanOneWinnerWithPair.push(sortedPair[i]);    
        }
    }
    console.log("Winner with high pair: ", moreThanOneWinnerWithPair);
  } else if (!uniqueArrayofPlayer && uniqueArrayofcard)
  {
    if ( pair.length == 2 || pair.length == 3 ){
      console.log("Only one Player got Two Pair");
      console.log("Winner with two pair, Player: ", pair[0].Player);
    }
    
    else {
    sortedPair = pair.sort(function(a, b) {
    return values.indexOf(a.Player) - values.indexOf(b.Player);
    });
    //topPairPlayerAndCard = sortedPair[0];
    
    var moreThanOneWinnerWithTwoPair = [];
    for (i = 0; i < sortedPair.length - 1; i++)
    {
      if(sortedPair[i + 1].Player == sortedPair[i].Player)
        {
          moreThanOneWinnerWithTwoPair.push(sortedPair[i]);    
        }
    }
    console.log("Winner with Two pair: ", moreThanOneWinnerWithTwoPair);
  
  }  
    
  } else {
    if (pair.length = 2)
    {
      console.log("Winner with Three of a kind, Player: ", pair[0].Player);
    }
     else if((pair[0].Player == pair[1].Player == pair[2].Player) && pair.length == 3)
    {
      console.log("Winner with Full House, Player: ", pair[0].Player);
    } else if(pair.length == 3 ){
      console.log("Winner with Three of a kind, Player: ", pair[0].Player);
    } else {
      console.log("More way to go!");
      var countOfPlayer = [];
      var count = 0;
      function countInArray() {
      for (var i = 0; i < (pair.length/2); i++) {
        for (j = 0; j < (playerCardsNumber/2); j++)
        {
          if ((i + 1) === pair[j].Player) {
              count++;
          } else {
            count = 0;
          }
        }
        countOfPlayer.push(count);
      }
      return count;
  }
  
  countInArray();
  console.log(countOfPlayer);
      
    }
  }
  
}



//console.log("Top Hand is Player: ", Math.floor(score.indexOf(max)/2) + 1);

//console.log("highCardSet: ", highCardSet);
//getWinner();
//console.log(winnerHandValue);
//console.log(winnerHand);

//console.log("Winner with high card, " + winnerHandValue + ". Player: ", Math.floor(winnerHand/2) + 1);

//console.log("\n");
//console.log(pair);



