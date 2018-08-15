/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName('card');
let cards = [...card];
let openedCards = [];
let moves = 0;
let counter = document.querySelector('.moves');
let stars = document.querySelector('.stars').children;
let restart = document.querySelector('.restart');
let replay = document.querySelector('.replay');
let matchedCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const deck = document.querySelector('.deck');
function startGame() {
	var shuffleCards = shuffle(cards);
	for (var c = 0; c < shuffleCards.length; c++) {
		[].forEach.call(shuffleCards, function(item) {
			deck.appendChild(item);
		});
	};
};
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

window.onload = startGame();
restart.addEventListener('click', restartGame);
replay.addEventListener('click', replayGame);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

var showCard = function() {
	this.classList.toggle('open');
	this.classList.toggle('show');
	this.removeEventListener('click', showCard);
	openedCards.push(this);
	matchCards();
};

addEvents();

function matchCards() {
	let len = openedCards.length;
	if (len === 2) {
		movesCounter();
		if (openedCards[0].firstElementChild.classList.value === openedCards[1].firstElementChild.classList.value) {
			matched();
			if (matchedCards.length === 16) {
				winGame();
			}
		} else {
			unmatched();
		};
	};
};

function matched() {
	openedCards[0].classList.add('match');
	openedCards[1].classList.add('match');
	matchedCards.push(openedCards[0], openedCards[1]);
	openedCards =[];
};

function unmatched() {
	openedCards[0].classList.add('unmatch');
	openedCards[1].classList.add('unmatch');
	// Removes ability to click unopened cards. If clicked during timeout cards would not revert to hidden.
	removeEvents();
	setTimeout(function() {
		openedCards[0].classList.remove('open', 'show', 'unmatch');
		openedCards[1].classList.remove('open', 'show', 'unmatch');
		openedCards[0].addEventListener('click', showCard);
		openedCards[1].addEventListener('click', showCard);
		openedCards = [];
		addEvents();
	}, 1100);
};

function movesCounter() {
	moves++;
	counter.innerHTML = moves;
	if(moves > 8 && moves < 12) {
		for(i = 0; i <= 2; i++) {
			if(i > 1) {
				stars[i].firstElementChild.classList.remove('fa-star');
				stars[i].firstElementChild.classList.add('fa-star-o');
			};
		};
	}else if(moves > 12) {
		for(i = 0; i <=2; i++) {
			if(i > 0) {
				stars[i].firstElementChild.classList.remove('fa-star');
				stars[i].firstElementChild.classList.add('fa-star-o');				
			};
		};
	};
};

function restartGame() {
	moves = 0;
	counter.innerHTML = moves;
	hideAll();
	startGame();
	addEvents();
	for (i = 0; i < stars.length; i++) {
		stars[i].firstElementChild.classList.remove('fa-star-o');
		stars[i].firstElementChild.classList.add('fa-star');
	}
};

function hideAll() {
	for(i = 0; i < cards.length; i++) {
		cards[i].classList.remove('show', 'open', 'match');
	};
};

function addEvents() {
	for (i = 0; i < cards.length; i++) {
		if (!cards[i].classList.value.includes('match')) {
			cards[i].addEventListener('click', showCard);
		};
	};
};

function removeEvents(){
	for(i = 0; i < cards.length; i++) {
		cards[i].removeEventListener('click', showCard)
	};
};

function winGame() {
	let gameBoard = document.querySelector('.container');
	let scoreCard = document.querySelector('.scoreCard');
	let numMoves = document.querySelector('.numMoves');
	let numStars = document.querySelector('.numStars');
	gameBoard.style.display = 'none';
	scoreCard.style.display = 'flex';
	numMoves.innerHTML = moves;
	if (moves > 8 && moves < 12) {
		numStars.innerHTML = '2 Stars';
	} else if (moves > 12) {
		numStars.innerHTML = '1 Star';
	};
};

function replayGame() {
	let gameBoard = document.querySelector('.container');
	let scoreCard = document.querySelector('.scoreCard');
	gameBoard.style.display = 'flex';
	scoreCard.style.display = 'none';
	restartGame();
};