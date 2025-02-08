const Gameboard = function() {
	const cells = 9;
	let board = [];

	for (i = 0; i < cells; i++) {
		board[i] = Cell();
	}

	const markBoard = (move, playerPiece) => {
		let targetCell = (move - 1)
		if (board[targetCell].getCell() !== " ") {
			alert("Sorry, that spot is taken. Try again!");
			return false;
		}
		else {
			board[targetCell].fillCell(playerPiece);
			return board;
		}
	}

	const getBoardWithValues = () => {
		const boardWithValues = board.map(cell => cell.getCell());
		return boardWithValues
	}

	const printBoard = () => {
		const boardWithValues = getBoardWithValues();
		const printedBoard = [];
		const row1 = [];
		const row2 = [];
		const row3 = [];
		for (i = 0; i < boardWithValues.length; i++) {
			if (i >= 0 && i <= 2) {
				row1.push(boardWithValues[i])
			}
			else if (i >= 3 && i <= 5) {
				row2.push(boardWithValues[i])
			}
			else if (i >= 6 && i <= 8) {
				row3.push(boardWithValues[i])
			}
		}
		
		printedBoard.push(row1, row2, row3);
		printedBoard.map(row => console.log(row))
		console.log("\n")
	}

	const checkForWinner = (players) => {
		for (i = 0; i < players.length; i++) {
			const board = getBoardWithValues();
			const player = players[i];
			const piece = players[i].piece;
			if ((board[0] === piece &&			// row 1 win
				board[1] === piece &&
				board[2] === piece) ||
				
				(board[3] === piece &&			// row 2 win
				board[4] === piece &&
				board[5] === piece) ||
			
				(board[6] === piece &&			// row 3 win
				board[7] === piece &&
				board[8] === piece) ||
				
				(board[0] === piece &&			// col 1 win
				board[3] === piece &&
				board[6] === piece) ||
				
				(board[1] === piece &&			// col 2 win
				board[4] === piece &&
				board[7] === piece) ||

				(board[6] === piece &&			// col 3 win
				board[7] === piece &&
				board[8] === piece) ||
				
				(board[0] === piece &&			// L -> R down diagonal win
				board[4] === piece &&
				board[8] === piece) ||
				
				(board[2] === piece &&			// L -> R up diagonal win
				board[4] === piece &&
				board[6] === piece)) {
					return player;
				}
			else {
				return false
			}
		}
	}

	const resetBoard = () => {
		const newBoard = board.map(cell => cell.fillCell(" "));
		return newBoard
	}

	return {
		markBoard,
		printBoard,
		checkForWinner,
		resetBoard
	};
};

const Cell = () => {
	let value = " ";

	const fillCell = (playerPiece) => {
		value = playerPiece;
		return value
	};

	const getCell = () => value;

	return {
		fillCell,
		getCell
	};
};

const Gamemaster = (playerOne = prompt("Enter player 1 name: "), playerTwo = prompt("Enter player 2 name: ")) => {
	const players = [
		{
			name: playerOne,
			piece: "X",
			score: keepScore()
		},
		{
			name: playerTwo,
			piece: "O",
			score: keepScore()
		}
	];
	let activePlayer = players[0];
	let board = Gameboard()

	const switchPlayer = () => {
		if (activePlayer === players[0]) {
			activePlayer = players[1];
		}
		else {
			activePlayer = players[0];
		};
		return activePlayer;
	};

	const printScore = () => {
		for (i = 0; i < players.length; i++) {
			console.log(players[i].name.toUpperCase() + " SCORE = " + players[i].score.getScore())
		}
	};

	const getMove = () => {
		const move = Number(prompt(`${activePlayer.name}, choose your square.`));
		return move;
	};

	const playRound = () => {
		const move = getMove();
		if (!board.markBoard(move, `${activePlayer.piece}`)) {
			switchPlayer()
		};
		board.printBoard();
		const winner = board.checkForWinner(players);
		if (winner !== false) {
			winner.score.incrementScore();
			printScore();
			alert(winner.name.toUpperCase() + " WINS!");
			board.resetBoard();
			board.printBoard();
		}
		else {
			printScore();
		}
		switchPlayer();
	};

	const playGame = () => {
		while (true) {
			playRound();
		}
	}

	return {
		switchPlayer,
		playGame,
		getMove
	};
};

const keepScore = () => {
	let score = 0;

	const getScore = () => score;

	const incrementScore = () => score++;

	return {
		getScore,
		incrementScore,
	}
};

const game = Gamemaster().playGame();