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
		for (i = 0; i < boardWithValues.length; i++) {
			const square = document.getElementById(i + 1);
			square.firstChild.textContent = boardWithValues[i]
		}
	}
	const checkForWinner = (players) => {
		for (i = 0; i < players.length; i++) {
			const board = getBoardWithValues();
			const player = players[i];
			const piece = player.piece;
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

				(board[2] === piece &&			// col 3 win
				board[5] === piece &&
				board[8] === piece) ||
				
				(board[0] === piece &&			// L -> R down diagonal win
				board[4] === piece &&
				board[8] === piece) ||
				
				(board[6] === piece &&			// L -> R up diagonal win
				board[4] === piece &&
				board[2] === piece)) {
					return player;
				};
		};
	};
	const checkForTie = () => {
		const board = getBoardWithValues();
		if (!board.includes(" ")) {
			const catsGame = "tie";
			return catsGame;
		};
	};
	const resetBoard = () => {
		const newBoard = board.map(cell => cell.fillCell(" "));
		return newBoard
	}
	return {
		markBoard,
		printBoard,
		checkForWinner,
		checkForTie,
		resetBoard,
		getBoardWithValues
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

const Gamemaster = (playerOne, playerTwo) => {
	const players = [
		{
			name: playerOne,
			piece: "x",
			score: keepScore()
		},
		{
			name: playerTwo,
			piece: "o",
			score: keepScore()
		}
	];
	let activePlayer = players[0];
	let board = Gameboard();
	
	const getBoard = () => board;
	const getPlayers = () => players;
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
	const printScore = () => {
		for (i = 0; i < players.length; i++) {
			const namebox = document.getElementById(`player${i+1}`);
			const scorebox = document.getElementById(`p${i+1}score`);
			const playerScore = players[i].score.getScore();
			namebox.textContent = `${players[i].name.toUpperCase()} (${players[i].piece}): `;
			scorebox.textContent = playerScore;
		}
	};
	const showResult = (input) => {
		const dialog = document.getElementById("result");
		const announce = document.getElementById("announcement");
		const btn = document.getElementById("continue");
		if (players.includes(input)) {
			announce.textContent = `${input.name.toUpperCase()} WINS!`
		}
		else {
			announce.textContent = `CAT'S GAME!`
		}
		btn.addEventListener("click", () => {
			board.resetBoard();
			board.printBoard();
			dialog.close()
		})
		dialog.showModal();
	}
	const getMove = () => {
		const move = Number(Math.floor(Math.random() * 9) + 1);
		return move;
	};
	const playRound = (squareID) => {						// receive clicked ID from square
		const move = squareID;
		const player = getActivePlayer();
		if (!board.markBoard(move, player.piece)) {
			switchPlayer()
		};
		board.printBoard();
		const winner = board.checkForWinner(players);
		if (winner) {
			board.printBoard();
			winner.score.incrementScore();
			printScore();
			showResult(winner);
		}
		else if (!winner) {
			const tie = board.checkForTie();
			if (tie) {
				printScore();
				showResult(tie);
			};
		};
		switchPlayer();
	};
	return {
		switchPlayer,
		playRound,
		getMove,
		getActivePlayer,
		getBoard,
		getPlayers,
		printScore
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

const display = (game) => {

	const createGrid = () => {
		const grid = document.getElementById("grid");				// grab "grid" div
		for (i = 0; i < 9; i++) {									// loop to make a row (x3)
			const cell = document.createElement("div");
			cell.setAttribute("id", `${i + 1}`);
			cell.setAttribute("class", "cell");
			cell.addEventListener("click", () => {			// on click,
				const id = cell.id;							// get id value of clicked div
				game.playRound(id);								// and feed that to playRound as move
			})
			const text = document.createElement("p");
			cell.appendChild(text);
			grid.appendChild(cell);
		}
	}

	return {
		createGrid
	}
}

const storeInput = (formId) => {
	const input = document.getElementById(formId);
	return input.value
}

window.addEventListener("DOMContentLoaded", () => {
	/* const playerCreate = document.getElementById("player-create");
	playerCreate.showModal();

	playerCreate.addEventListener("submit", () => {
		const playerOneName = storeInput("player-one");
		const playerTwoName = storeInput("player-two");
		const game = Gamemaster(playerOneName, playerTwoName); */
		const game = Gamemaster("Steven", "Ivana");
		display(game).createGrid();
		game.printScore();
	})
/* }) */