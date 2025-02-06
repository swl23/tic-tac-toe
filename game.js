const Gameboard = function() {
	const cells = 9;
	let board = [];

	for (i = 0; i < cells; i++) {
		board[i] = Cell();
	}


	const getBoard = () => board;

	const markBoard = (move, playerPiece) => {
		let targetCell = (move - 1)
		if (board[targetCell].getCell() !== "_") {
			alert("Sorry, that spot is taken. You lose your turn!");
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
		console.log(printedBoard);
	}

	const checkForWinner = () => {
		
	}

	return {
		getBoard,
		markBoard,
		printBoard
	};
}

const Cell = () => {
	let value = "_";

	const fillCell = (playerPiece) => {
		value = playerPiece;
		return value
	};

	const getCell = () => value;

	return {
		fillCell,
		getCell
	};
}

const Gamemaster = (playerOne = "Toby", playerTwo = "Alice") => {
	const players = [
		{
			name: playerOne,
			piece: "X"
		},
		{
			name: playerTwo,
			piece: "O"
		}
	];
	let activePlayer = players[0];
	let board = Gameboard()

	const getActivePlayer = () => activePlayer;

	const switchPlayer = () => {
		if (activePlayer === players[0]) {
			activePlayer = players[1];
		}
		else {
			activePlayer = players[0];
		};
		return activePlayer;
	};

	const getMove = () => {
		const move = Number(prompt(`${activePlayer.name}, choose your square.`));
		return move;
	};

	const playRound = () => {
		const move = getMove();
		board.markBoard(move, `${activePlayer.piece}`);
		board.printBoard();
		switchPlayer();
	}

	return {
		getActivePlayer,
		switchPlayer,
		playRound,
		getMove
	};
}

const game = Gamemaster();
game.playRound();
game.playRound();
game.playRound();
game.playRound();
game.playRound();
game.playRound();
game.playRound();